# Cắt sprite Sủng Vật Gà Con -> ga_con.png (+ icon trứng, icon kỹ năng)
# Hàng theo hướng game: 0 xuống, 1 trái, 2 phải, 3 lên.
# Cột 0-3 đi, 4-7 đánh, 8-10 đứng yên, 11-13 nghỉ ngơi (ngủ).
import sys, numpy as np
from PIL import Image
from scipy import ndimage

SRC = sys.argv[1] if len(sys.argv) > 1 else "."
OUT = sys.argv[2] if len(sys.argv) > 2 else "out"
CAO = 96                      # chiều cao Gà Con lúc đi (px trong sheet)
FW, FH, AX, AY = 112, 112, 56, 106

def nap(f):
    return np.array(Image.open(f"{SRC}/{f}.png").convert("RGBA"))

def tach(a, hang, cot):
    """tách khung theo thành phần liền khối trên cả ảnh (không cắt lưới) -> [hàng][cột]"""
    al = a[:, :, 3] > 40
    lab, n = ndimage.label(al)
    sz = ndimage.sum(al, lab, range(1, n + 1))
    obj = ndimage.find_objects(lab)
    lon = sz.max()
    than = [i for i in range(n) if sz[i] >= lon * 0.2]
    assert len(than) == hang * cot, (len(than), hang * cot)
    than.sort(key=lambda i: ((obj[i][0].start + obj[i][0].stop) / 2, ))
    rows = [sorted(than[r * cot:(r + 1) * cot], key=lambda i: obj[i][1].start) for r in range(hang)]
    # mảnh nhỏ: gán cho thân gần nhất nếu nằm sát (≤ 30px), xa thì bỏ (dấu nước, vụn)
    gan = {i: [i] for i in than}
    for i in range(n):
        if i in gan or sz[i] < 8:
            continue
        ys, xs = obj[i]
        best, bd = None, 1e9
        for j in than:
            yj, xj = obj[j]
            dy = max(0, yj.start - ys.stop, ys.start - yj.stop)
            dx = max(0, xj.start - xs.stop, xs.start - xj.stop)
            d = max(dx, dy)
            if d < bd:
                bd, best = d, j
        if bd <= 30:
            gan[best].append(i)
    out = []
    for r in rows:
        hr = []
        for j in r:
            m = np.isin(lab, [k + 1 for k in gan[j]])
            ys, xs = np.nonzero(m)
            y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
            f = a[y0:y1, x0:x1].copy()
            f[~m[y0:y1, x0:x1]] = 0
            # tâm ngang & đáy theo thân chính
            ty, tx = obj[j]
            cx = (tx.start + tx.stop) / 2 - x0
            day = ty.stop - y0
            hr.append((f, cx, day, ty.stop - ty.start))
        out.append(hr)
    return out

di = tach(nap("di"), 4, 4)
danh = tach(nap("danh"), 2, 4)
dung = tach(nap("dung"), 1, 3)[0]
nghi = tach(nap("nghi"), 1, 3)[0]

cao_di = np.median([f[3] for f in di[0]])
k0 = CAO / cao_di
k_danh = k0 * cao_di / np.median([f[3] for f in danh[0]])
k_dung = k0 * cao_di / np.median([f[3] for f in dung])
def rong(f): return f[0].shape[1]
k_nghi = k_dung * np.median([rong(f) for f in dung]) / np.median([rong(f) for f in nghi])
# hàng đi lưng: khung 3 có dấu nước in lên thân -> dùng khung 1 (chu kỳ 0,1,2,1)
di[3][3] = di[3][1]
print("k_nghi %.3f" % k_nghi)
print("k0 %.3f k_danh %.3f k_dung %.3f" % (k0, k_danh, k_dung))

sheet = Image.new("RGBA", (FW * 14, FH * 4))
def dat(f, col, row, k, lat=False, dy=0):
    a, cx, day, _ = f
    im = Image.fromarray(a)
    if lat:
        im = im.transpose(Image.FLIP_LEFT_RIGHT); cx = a.shape[1] - cx
    w, h = max(1, round(im.width * k)), max(1, round(im.height * k))
    im = im.resize((w, h), Image.LANCZOS)
    x = col * FW + AX - round(cx * k)
    y = row * FH + AY - round(day * k) + dy
    sheet.alpha_composite(im, (int(x), int(y)))

# đi: xuống=hàng0, trái=hàng1 (mỏ quay trái), phải=hàng2, lên=hàng3
DI = {0: 0, 1: 1, 2: 2, 3: 3}
for g, r in DI.items():
    for c in range(4):
        dat(di[r][c], c, g, k0)
# đánh: xuống=danh hàng0, trái=danh hàng1, phải=lật hàng1, lên=đi lưng (nhào tới bằng code)
for c in range(4):
    dat(danh[0][c], 4 + c, 0, k_danh)
    dat(danh[1][c], 4 + c, 1, k_danh)
    dat(danh[1][c], 4 + c, 2, k_danh, lat=True)
    dat(di[3][c], 4 + c, 3, k0, dy=[0, -3, -6, -2][c])
# đứng yên: xuống = 3 khung chớp mắt; hướng khác = khung đi đứng thẳng
for c in range(3):
    dat(dung[c], 8 + c, 0, k_dung)
    for g in (1, 2, 3):
        dat(di[DI[g]][0], 8 + c, g, k0, dy=[0, -1, 0][c])
# nghỉ ngơi: 3 khung (lim dim → ngủ), mọi hướng như nhau
for c in range(3):
    for g in range(4):
        dat(nghi[c], 11 + c, g, k_nghi)

arr = np.array(sheet)
arr[:, :, 3] = np.where(arr[:, :, 3] > 100, 255, 0)
arr[arr[:, :, 3] == 0] = 0
Image.fromarray(arr).quantize(256, method=Image.FASTOCTREE).save(f"{OUT}/ga_con.png", optimize=True)

def icon(src, kt, ra):
    a = np.array(Image.open(src).convert("RGBA"))
    al = a[:, :, 3] > 40
    ys, xs = np.nonzero(al)
    im = Image.fromarray(a[ys.min():ys.max() + 1, xs.min():xs.max() + 1])
    s = kt / max(im.size)
    im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    o = Image.new("RGBA", (kt, kt)); o.alpha_composite(im, ((kt - im.width) // 2, (kt - im.height) // 2))
    o.save(ra, optimize=True)
icon(f"{SRC}/trung.png", 64, f"{OUT}/icon_trung_ga_con.png")
Image.open(f"{SRC}/icon_skill.png").convert("RGBA").save(f"{OUT}/ga_con_ky_nang.png", optimize=True)
# chân dung cho bảng Sủng Vật: khung đứng yên đầu tiên
a, cx, day, _ = dung[0]
im = Image.fromarray(a); s = 64 / max(im.size)
im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
o = Image.new("RGBA", (64, 64)); o.alpha_composite(im, ((64 - im.width) // 2, 64 - im.height)); o.save(f"{OUT}/icon_ga_con.png", optimize=True)
print("xong", sheet.size)
