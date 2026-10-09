# Cắt sprite Bé Hòa Bình -> assets/sprites/ngoai_trang/be_hoa_binh.png
# Hàng theo hướng game: 0 xuống, 1 trái, 2 phải, 3 lên.
# Cột 0-3 đi, 4-7 đánh, 8-10 ngồi, 11-13 đứng yên.
import sys, numpy as np
from PIL import Image
from scipy import ndimage

SRC = sys.argv[1] if len(sys.argv) > 1 else "."
OUT = sys.argv[2] if len(sys.argv) > 2 else "be_hoa_binh.png"
FW, FH, AX, AY = 280, 210, 140, 196

def nap(f):
    return np.array(Image.open(f"{SRC}/{f}.png").convert("RGBA"))

def lam_sach(a):
    """giữ thân chính, bỏ chấm lẻ; trả về ảnh RGBA đã cắt sát + (cx_dau, day)"""
    al = a[:, :, 3] > 40
    lab, n = ndimage.label(al)
    if n == 0:
        return None
    sz = ndimage.sum(al, lab, range(1, n + 1))
    giu = np.zeros_like(al)
    lon = sz.max()
    for i, s in enumerate(sz):
        if s >= lon * 0.03:
            giu |= lab == i + 1
    a = a.copy()
    a[~giu] = 0
    a[:, :, 3] = np.where(a[:, :, 3] > 40, 255, 0)
    ys, xs = np.nonzero(giu)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    a = a[y0:y1, x0:x1]
    # tâm theo đầu (25% trên) — tay vung ra không làm lệch thân
    h = y1 - y0
    dau = a[: max(1, h // 4), :, 3] > 0
    cx = np.nonzero(dau)[1].mean()
    return a, cx, h

def o(a, y0, y1, x0, x1):
    return lam_sach(a[y0:y1, x0:x1])

def chia(a, hang, cot):
    H, W = a.shape[:2]
    return [[o(a, H * r // hang, H * (r + 1) // hang, W * c // cot, W * (c + 1) // cot) for c in range(cot)] for r in range(hang)]

di = nap("di"); danh = nap("danh"); ngoi = nap("ngoi"); dung = nap("dung")
# di.png: hàng không đều -> cắt theo dải đo sẵn
DI_Y = [(0, 205), (205, 389), (389, 580), (580, 765)]
DI = [[o(di, y0, y1, 256 * c, 256 * (c + 1)) for c in range(4)] for (y0, y1) in DI_Y]
DANH = chia(danh, 4, 4)
NGOI = chia(ngoi, 1, 3)[0]
DUNG = chia(dung, 1, 3)[0]

cao_di = np.median([f[2] for f in DI[0]])
k_danh = cao_di / DANH[0][0][2]          # khung 0 hàng trước là thế đứng
k_dung = cao_di / np.median([f[2] for f in DUNG])
def rong_dau(f):
    a = f[0]; dau = a[: a.shape[0] // 4, :, 3] > 0
    return np.ptp(np.nonzero(dau)[1]) + 1
k_ngoi = k_dung * np.median([rong_dau(f) for f in DUNG]) / np.median([rong_dau(f) for f in NGOI])
print("k_ngoi", k_ngoi)
print("cao di", cao_di, "k_danh", k_danh, "k_dung", k_dung)

def dat(sheet, f, col, row, k, lat=False):
    a, cx, h = f
    im = Image.fromarray(a)
    if lat:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
        cx = a.shape[1] - cx
    if abs(k - 1) > 0.01:
        im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
        cx *= k
    x = col * FW + AX - round(cx)
    y = row * FH + AY - im.height
    if y < row * FH:
        print("cao quá", col, row)
    sheet.alpha_composite(im, (int(x), int(y))) if x >= 0 else None

sheet = Image.new("RGBA", (FW * 14, FH * 4))
# hướng game -> (hàng nguồn đi, hàng nguồn đánh, lật)
HUONG = {0: (0, 0, False, False), 1: (2, 2, False, True), 2: (3, 2, False, False), 3: (1, 1, False, False)}
for g, (rdi, rdanh, latdi, latdanh) in HUONG.items():
    for c in range(4):
        dat(sheet, DI[rdi][c], c, g, 1.0, latdi)
        dat(sheet, DANH[rdanh][c], 4 + c, g, k_danh, latdanh)
    for c in range(3):
        dat(sheet, NGOI[c], 8 + c, g, k_ngoi)
        dat(sheet, DUNG[c], 11 + c, g, k_dung)

# bỏ viền bán trong suốt do resize
arr = np.array(sheet)
arr[:, :, 3] = np.where(arr[:, :, 3] > 110, 255, 0)
arr[arr[:, :, 3] == 0] = 0
sheet = Image.fromarray(arr)
sheet.quantize(256, method=Image.FASTOCTREE).save(OUT, optimize=True)

# icon từ chân dung
cd = lam_sach(nap("chan_dung"))[0]
im = Image.fromarray(cd)
s = 64 / max(im.size)
im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
ic = Image.new("RGBA", (64, 64)); ic.alpha_composite(im, ((64 - im.width) // 2, (64 - im.height) // 2))
ic.save(sys.argv[3] if len(sys.argv) > 3 else "icon.png", optimize=True)
print("xong", sheet.size)
