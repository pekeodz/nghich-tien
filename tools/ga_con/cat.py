# Ghép sprite Sủng Vật Gà Con (bản đội nón lá, cầm súng) -> ga_con.png
# Đầu vào: thư mục ảnh lẻ (mỗi khung một file, đã cắt sát).
# Hàng theo hướng game: 0 xuống, 1 trái, 2 phải, 3 lên.
# Cột 0-4 đi (xuống 4, trái 4, phải 5, lên 4 khung), 5-8 đánh (xuống 4, trái 3, phải 3, lên 4),
#     9-11 đứng yên (3 khung, nhìn trước), 12-15 nghỉ ngơi (4 khung).
import sys, glob, numpy as np
from PIL import Image
from scipy import ndimage

SRC = sys.argv[1] if len(sys.argv) > 1 else "src"
OUT = sys.argv[2] if len(sys.argv) > 2 else "out"
K = 0.62                       # thu nhỏ chung (ảnh gốc ~180px cao)
FW, FH, AX, AY = 136, 136, 68, 128

def nap(f):
    a = np.array(Image.open(f).convert("RGBA"))
    al = a[:, :, 3] > 40
    lab, n = ndimage.label(al)
    sz = ndimage.sum(al, lab, range(1, n + 1))
    chinh = int(np.argmax(sz)) + 1
    m = lab == chinh
    ys, xs = np.nonzero(m)
    y0, y1 = ys.min(), ys.max() + 1
    # tâm ngang theo vành nón (30% trên của thân chính) — súng, lửa đạn không làm lệch
    dau = m[y0:y0 + max(1, (y1 - y0) * 3 // 10)]
    cx = np.nonzero(dau)[1].mean()
    # bỏ hạt vụn quá nhỏ, giữ lửa đạn
    giu = np.isin(lab, [i + 1 for i in range(n) if sz[i] >= 25])
    a = a.copy(); a[~giu] = 0
    return a, cx, y1, y1 - y0

def nhom(mau):
    ds = sorted(glob.glob(f"{SRC}/{mau}"), key=lambda s: int(s.rsplit("_", 1)[1].split(".")[0]))
    assert ds, mau
    return [nap(f) for f in ds]

DI = [nhom("sprite di chuyen/di_xuong_*.png"), nhom("sprite di chuyen/di_trai_*.png"),
      nhom("sprite di chuyen/di_phai_*.png"), nhom("sprite di chuyen/di_len_*.png")]
DANH = [nhom("sprite tan cong/tan_cong_xuong_*.png"), nhom("sprite tan cong/tan_cong_trai_*.png"),
        nhom("sprite tan cong/tan_cong_phai_*.png"), nhom("sprite tan cong/sprite_tan_cong_len_*.png")]
DUNG = nhom("sprite dung yen/sprite_dung_yen_*.png")
NGHI = nhom("sprite nghi ngoi/sprite_nghi_ngoi_*.png")

sheet = Image.new("RGBA", (FW * 16, FH * 4))
def dat(f, col, row, k):
    a, cx, day, _ = f
    im = Image.fromarray(a)
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    sheet.alpha_composite(im, (int(col * FW + AX - round(cx * k)), int(row * FH + AY - round(day * k))))

med = lambda g: float(np.median([f[3] for f in g]))
for r in range(4):
    for c, f in enumerate(DI[r]): dat(f, c, r, K)
    kd = K * med(DI[r]) / med(DANH[r])            # đánh cao bằng đi cùng hướng
    for c, f in enumerate(DANH[r]): dat(f, 5 + c, r, kd)
    for c, f in enumerate(DUNG): dat(f, 9 + c, r, K)
    for c, f in enumerate(NGHI): dat(f, 12 + c, r, K)
print("so khung di", [len(g) for g in DI], "danh", [len(g) for g in DANH], "dung", len(DUNG), "nghi", len(NGHI))

arr = np.array(sheet)
arr[:, :, 3] = np.where(arr[:, :, 3] > 100, 255, 0)
arr[arr[:, :, 3] == 0] = 0
Image.fromarray(arr).quantize(256, method=Image.FASTOCTREE).save(f"{OUT}/ga_con.png", optimize=True)

def vua(im, kt):
    im = im.convert("RGBA"); bb = im.getbbox(); im = im.crop(bb)
    s = kt / max(im.size)
    im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    o = Image.new("RGBA", (kt, kt)); o.alpha_composite(im, ((kt - im.width) // 2, (kt - im.height) // 2))
    return o
# chân dung sủng vật + icon kỹ năng
vua(Image.open(f"{SRC}/icon_pet.png"), 64).save(f"{OUT}/icon_ga_con.png", optimize=True)
Image.open(f"{SRC}/icon_ky_nang.png").convert("RGBA").save(f"{OUT}/ga_con_ky_nang.png", optimize=True)
# trứng: vỏ trứng xanh (nửa dưới ảnh trứng cũ) ôm Gà Con mới
cu = np.array(Image.open(f"{SRC}/trung_cu.png").convert("RGBA"))
H = cu.shape[0]
vo = cu.copy()
r, g, b, al = [vo[:, :, i].astype(int) for i in range(4)]
xanh = (b > r + 20) & (b > g) & (al > 40)            # chỉ giữ phần vỏ màu xanh và viền
lab, n = ndimage.label(xanh | ((al > 40) & (r + g + b < 120) & (np.arange(H)[:, None] > H * 0.55)))
vo[~(lab > 0) | (np.arange(H)[:, None] < H * 0.5)] = 0
vo = Image.fromarray(vo); bb = vo.getbbox(); vo = vo.crop(bb)
nen = Image.new("RGBA", (128, 128))
ga = vua(Image.open(f"{SRC}/icon_pet.png"), 92)
nen.alpha_composite(ga, (18, 2))
s = 124 / vo.width; vo = vo.resize((124, max(1, round(vo.height * s))), Image.LANCZOS)
nen.alpha_composite(vo, (2, 128 - vo.height))
vua(nen, 64).save(f"{OUT}/icon_trung_ga_con.png", optimize=True)
print("xong", sheet.size)
