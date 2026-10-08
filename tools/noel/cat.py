# Cắt sprite Ông Già Noel: di.png (đi 8 khung), danh.png (đánh 8 khung), ngoi.png (ngồi 2 khung)
# Hàng trong tấm gốc: 0 lưng (lên), 1 mặt (xuống), 2 quay trái, 3 quay phải
# Ảnh ra: 4 hàng theo thứ tự hướng của game (xuống, trái, phải, lên); cột 0-7 đi, 8-15 đánh, 16-17 ngồi
import json, sys
from PIL import Image
import numpy as np
K = float(sys.argv[1]) if len(sys.argv) > 1 else 0.46
FW, FH, AX, AY = 140, 174, 70, 148
HANG_DI = [(0, 150), (150, 292), (292, 435), (435, 572)]
HANG_DANH = [(0, 150), (150, 292), (292, 435), (435, 572)]
GAME_TO_SHEET = [1, 2, 3, 0]
def bbox(im): return im.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
def o(sheet, hang, cot, rows):
    y0, y1 = rows[hang]; return sheet.crop((cot * 128, y0, cot * 128 + 128, y1))
DI, DANH, NGOI = Image.open('di.png').convert('RGBA'), Image.open('danh.png').convert('RGBA'), Image.open('ngoi.png').convert('RGBA')
out = Image.new('RGBA', (FW * 18, FH * 4))
def dat(cell, ref, col, row, k=K):
    """cell: ô gốc; ref: ô gốc dùng để lấy chân + tâm thân (khung đi 0 cùng hướng)"""
    bb = bbox(ref); a = np.array(ref)[:, :, 3] > 20
    ys, xs = np.nonzero(a[bb[1]:bb[3], :]); cx = xs.mean(); foot = bb[3]
    w, h = round(cell.width * k), round(cell.height * k)
    c = cell.resize((w, h), Image.LANCZOS)
    x = round(AX - cx * k); y = round(AY - foot * k)
    fr = Image.new('RGBA', (FW, FH)); fr.alpha_composite(c, (x, y)) if x >= 0 and y >= 0 else fr.paste(c, (x, y), c)
    out.alpha_composite(fr, (col * FW, row * FH))
for g in range(4):
    s = GAME_TO_SHEET[g]
    ref_di = o(DI, s, 0, HANG_DI); ref_danh = o(DANH, s, 0, HANG_DANH)
    for i in range(8): dat(o(DI, s, i, HANG_DI), ref_di, i, g)
    for i in range(8): dat(o(DANH, s, i, HANG_DANH), ref_danh, 8 + i, g)
# ngồi: 2 khung lớn, quay mặt; hạ tỉ lệ cho cao ~44 điểm
KS = 0.304
for j, (x0, x1) in enumerate([(0, 512), (512, 1024)]):
    cell = NGOI.crop((x0, 0, x1, NGOI.height))
    for g in range(4): dat(cell, cell, 16 + j, g, KS)
out.save('noel.png', optimize=True)
print(json.dumps(dict(fw=FW, fh=FH, ax=AX, ay=AY, cols=18, K=K)))

# ---- cột 18: dáng đứng yên, hai chân thẳng hàng ----
# xuống: khung đi 7 (tư thế đứng sẵn trong tấm gốc)
# lên: lấy khung đi 0, soi gương chân đặt đất (chân thấp hơn) sang bên kia
# trái / phải: lấy khung đi có hai chân khép sát nhất
def chan_doi_xung(f, leg_y=128):
    a = np.array(f); al = a[..., 3] > 40
    cols = np.nonzero(al[leg_y:150].any(axis=0))[0]; ci = int(round((cols.min() + cols.max()) / 2))
    L, R = al[leg_y:, :ci], al[leg_y:, ci:]
    lowL = np.nonzero(L.any(axis=1))[0].max(); lowR = np.nonzero(R.any(axis=1))[0].max()
    b = a.copy()
    if lowL >= lowR:
        m = a[leg_y:, :ci][:, ::-1]; w = min(m.shape[1], f.width - ci); b[leg_y:, ci:] = 0; b[leg_y:, ci:ci + w] = m[:, :w]
    else:
        m = a[leg_y:, ci:][:, ::-1]; w = min(m.shape[1], ci); b[leg_y:, :ci] = 0; b[leg_y:, ci - w:ci] = m[:, -w:]
    return Image.fromarray(b)
KHEP = {0: 7, 1: 3, 2: 0}   # hàng xuống: khung 7, trái: khung 3, phải: khung 0
full = Image.new('RGBA', (FW * 19, FH * 4)); full.alpha_composite(out, (0, 0))
for g in range(4):
    f = out.crop((0, g * FH, FW, g * FH + FH)) if g == 3 else out.crop((KHEP[g] * FW, g * FH, KHEP[g] * FW + FW, g * FH + FH))
    if g == 3: f = chan_doi_xung(f)
    full.alpha_composite(f, (18 * FW, g * FH))
full.save('noel.png', optimize=True)
print('them cot dung 18')
