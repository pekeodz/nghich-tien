# Cắt sprite Liễu Như Yên (bản 2): di.png (đi 8 khung), danh.png (đánh 8 khung), ngoi.png (ngồi 2 khung, nền trắng), dung2.png (đứng)
# Hàng gốc: 0 lưng (lên), 1 mặt (xuống), 2 quay trái, 3 quay phải. Bỏ bóng xám dưới chân (game tự vẽ bóng).
# Ảnh ra: 4 hàng theo hướng game (xuống, trái, phải, lên); cột 0-7 đi, 8-15 đánh, 16-17 ngồi, 18 đứng.
import json
import numpy as np
from PIL import Image
from scipy import ndimage as nd
FW, FH, AX, AY = 150, 180, 75, 160
G2S = [1, 2, 3, 0]
def bo_bong(im):
    """bóng xám hình elip dưới chân: bỏ phần xám, và phần viền tối nằm dưới tâm elip"""
    a = np.array(im).astype(int); r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    mx = np.maximum(np.maximum(r, g), b); mn = np.minimum(np.minimum(r, g), b)
    ys_all = np.nonzero((al > 60).any(axis=1))[0]
    if not len(ys_all): return im
    G = (al > 0) & (mx - mn < 12) & (mx >= 40) & (mx <= 95)
    G[:ys_all.max() - 20] = False
    lab, n = nd.label(G)
    if n:
        sz = nd.sum(G, lab, range(1, n + 1)); G = lab == 1 + int(np.argmax(sz))
    ys, xs = np.nonzero(G)
    if len(ys) < 30: return im
    cy, cx = (ys.min() + ys.max()) / 2, (xs.min() + xs.max()) / 2
    ry, rx = (ys.max() - ys.min()) / 2 + 3, (xs.max() - xs.min()) / 2 + 3
    yy, xx = np.mgrid[:a.shape[0], :a.shape[1]]
    trong = ((yy - cy) / ry) ** 2 + ((xx - cx) / rx) ** 2 <= 1
    xoa = G | (trong & (yy >= cy + 1) & (mx - mn < 18) & (mx < 100)) | ((yy >= cy) & (al < 160) & (mx < 70))
    a[..., 3] = np.where(xoa, 0, al)
    return Image.fromarray(a.astype(np.uint8))
def lon_nhat(im, nguong=40):
    a = np.array(im); lab, n = nd.label(nd.binary_dilation(a[..., 3] > nguong, iterations=2))
    if n > 1:
        sz = nd.sum(np.ones_like(lab), lab, range(1, n + 1)); keep = lab == 1 + int(np.argmax(sz))
        a[..., 3] = np.where(keep, a[..., 3], 0)
    im = Image.fromarray(a); return im.crop(im.getbbox())
def nen_xanh(a): return (a[..., 1] > 150) & (a[..., 2] > 150) & (a[..., 0] < 150)
def o(sheet, r, i): return sheet.crop((i * 128, r * 143, i * 128 + 128, r * 143 + 143))
def moc(cell):
    a = np.array(cell); al = (a[..., 3] > 60) & ~nen_xanh(a); ys, xs = np.nonzero(al)
    return (xs.mean() if len(xs) else cell.width / 2), (ys.max() if len(ys) else cell.height - 1)
def cao_than(im):
    a = np.array(im); al = (a[..., 3] > 60) & ~nen_xanh(a); ys = np.nonzero(al.any(axis=1))[0]; return ys.max() - ys.min()
DI, DANH = Image.open('di.png').convert('RGBA'), Image.open('danh.png').convert('RGBA')
out = Image.new('RGBA', (FW * 19, FH * 4))
def dat(cell, cx, foot, col, row, k=1.0):
    if k != 1.0:
        cell = cell.resize((round(cell.width * k), round(cell.height * k)), Image.LANCZOS); cx *= k; foot *= k
    fr = Image.new('RGBA', (FW, FH)); fr.paste(cell, (round(AX - cx), round(AY - foot)), cell)
    out.alpha_composite(fr, (col * FW, row * FH))
for g in range(4):
    r = G2S[g]
    for i in range(8):
        c = bo_bong(o(DI, r, i)); cx, f = moc(c); dat(c, cx, f, i, g)
        c = bo_bong(o(DANH, r, i)); cx, f = moc(c); dat(c, cx, f, 8 + i, g)
H = cao_than(bo_bong(o(DI, 1, 0)))
# ngồi: nền trắng → loang từ mép bỏ trắng
NG = np.array(Image.open('ngoi.png').convert('RGBA')).astype(int)
trang = (NG[..., :3].min(axis=2) > 235)
lab, n = nd.label(trang); mep = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
NG[..., 3] = np.where(np.isin(lab, list(mep)), 0, NG[..., 3])
NG = Image.fromarray(NG.astype(np.uint8))
for j, (x0, x1) in enumerate([(40, 500), (530, 1000)]):
    c = lon_nhat(NG.crop((x0, 100, x1, 700)))
    k = (H * 0.8) / c.height
    for g in range(4): dat(c, c.width / 2, c.height - 1, 16 + j, g, k)
dung = lon_nhat(Image.open('dung2.png').convert('RGBA'))
k = H / cao_than(dung)
for g in range(4): dat(dung, dung.width / 2, dung.height - 1, 18, g, k)
out.save('lieu_nhu_yen.png', optimize=True)
print(json.dumps(dict(fw=FW, fh=FH, ax=AX, ay=AY, H=int(H))))
