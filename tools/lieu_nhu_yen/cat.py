# Cắt sprite Liễu Như Yên: di.png (đi), danh.png (đánh), ngoi.png (ngồi 2 khung), dung2.png (đứng, nền trong suốt)
# Hàng gốc: 0 lưng (lên), 1 mặt (xuống), 2 quay phải, 3 quay trái. Hàng trên 12 khung, 2 hàng dưới 10 khung.
# Ảnh ra: 4 hàng theo hướng game (xuống, trái, phải, lên); cột 0-11 đi, 12-23 đánh, 24-25 ngồi, 26 đứng.
import json
import numpy as np
from PIL import Image
FW, FH, AX, AY = 150, 180, 75, 160
ROWS = [(0, 148), (148, 292), (292, 436), (436, 572)]
SO = [12, 12, 10, 10]
G2S = [1, 3, 2, 0]
def nen_xanh(a):  # vệt gió xanh ngọc: sáng, xanh lá + lam cao, đỏ thấp
    return (a[..., 1] > 150) & (a[..., 2] > 150) & (a[..., 0] < 150)
def o(sheet, r, i):
    y0, y1 = ROWS[r]; w = 1024 / SO[r]
    return sheet.crop((round(i * w), y0, round((i + 1) * w), y1))
def moc(cell):
    a = np.array(cell); al = a[..., 3] > 60; than = al & ~nen_xanh(a)
    ys, xs = np.nonzero(than)
    return (xs.mean() if len(xs) else cell.width / 2), (ys.max() if len(ys) else cell.height - 1)
DI, DANH = Image.open('di.png').convert('RGBA'), Image.open('danh.png').convert('RGBA')
out = Image.new('RGBA', (FW * 27, FH * 4))
def dat(cell, cx, foot, col, row, k=1.0):
    if k != 1.0:
        cell = cell.resize((round(cell.width * k), round(cell.height * k)), Image.LANCZOS); cx *= k; foot *= k
    fr = Image.new('RGBA', (FW, FH)); fr.paste(cell, (round(AX - cx), round(AY - foot)), cell)
    out.alpha_composite(fr, (col * FW, row * FH))
for g in range(4):
    r = G2S[g]
    cx0, f0 = moc(o(DI, r, 0))
    for i in range(SO[r]):
        c = o(DI, r, i); cx, f = moc(c); dat(c, cx, f, i, g)
    for i in range(SO[r]):
        c = o(DANH, r, i); cx, f = moc(c); dat(c, cx, f, 12 + i, g)
# chiều cao chuẩn: khung đi hướng xuống
a = np.array(o(DI, 1, 0)); al = a[..., 3] > 60; ys = np.nonzero(al.any(axis=1))[0]; H_DUNG = ys.max() - ys.min()
from scipy import ndimage as nd
def rong_dau(im):  # bề ngang phần mũ (30% trên cùng, bỏ vệt xanh)
    a = np.array(im); al = (a[..., 3] > 60) & ~nen_xanh(a); ys = np.nonzero(al.any(axis=1))[0]
    top = al[ys.min(): ys.min() + int(0.3 * (ys.max() - ys.min()))]; xs = np.nonzero(top.any(axis=0))[0]
    return xs.max() - xs.min()
def lon_nhat(im):
    a = np.array(im); lab, n = nd.label(a[..., 3] > 40)
    if n > 1:
        sz = nd.sum(np.ones_like(lab), lab, range(1, n + 1)); a[..., 3] = np.where(lab == 1 + int(np.argmax(sz)), a[..., 3], 0)
    im = Image.fromarray(a); return im.crop(im.getbbox())
W_DAU = rong_dau(o(DI, 1, 0))
# ngồi: 2 khung lớn
NG = Image.open('ngoi.png').convert('RGBA')
for j, (x0, x1) in enumerate([(150, 400), (640, 890)]):
    c = lon_nhat(NG.crop((x0, 200, x1, 540)))
    k = W_DAU / rong_dau(c)
    for g in range(4): dat(c, c.width / 2, c.height - 1, 24 + j, g, k)
# đứng: ảnh người dùng gửi (nền #222)
dung = lon_nhat(Image.open('dung2.png').convert('RGBA'))   # nền trong suốt
def cao_than(im):
    a = np.array(im); al = (a[..., 3] > 60) & ~nen_xanh(a); ys = np.nonzero(al.any(axis=1))[0]; return ys.max() - ys.min()
k = cao_than(o(DI, 1, 0)) / cao_than(dung)
for g in range(4): dat(dung, dung.width / 2, dung.height - 1, 26, g, k)
out.save('lieu_nhu_yen.png', optimize=True)
print(json.dumps(dict(fw=FW, fh=FH, ax=AX, ay=AY, H=int(H_DUNG), so=[SO[G2S[g]] for g in range(4)])))
