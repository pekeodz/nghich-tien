# Tạo lại dải danh hiệu Lăng Tuyệt (chữ pixel như Chí Tôn, màu xanh lá) và Vô Song (vàng kim óng ánh)
import sys, math, random, numpy as np
sys.path.insert(0, '/tmp/claude-0/sprmod')
import spr2png
from PIL import Image, ImageFilter
F = sys.argv[1]; OUT = sys.argv[2]
def fr(n, i=0): return spr2png.doc(F + n + '.spr')['frames'][i][0]
def cot(im, x0, x1): return im.crop((12 + x0, 10, 12 + x1, 27))
# ---- Lăng Tuyệt: "<Lăng" (Lăng vân) + "Tuyệt" + ">" (Tuyệt thế)
a, b = fr('rank_01'), fr('rank_02')
parts = [cot(a, 0, 35), None, cot(b, 5, 39), cot(b, 62, 69)]
W = sum(p.width for p in parts if p) + 4
txt = Image.new('RGBA', (W, 17)); x = 0
for p in parts:
    if p is None: x += 4; continue
    txt.alpha_composite(p, (x, 0)); x += p.width
t = np.array(txt).astype(float)
m = (t[:, :, :3].max(axis=2) / 255.0) * (t[:, :, 3] / 255.0)   # độ đậm nét chữ 0..1
m = np.clip((m - 0.12) / 0.6, 0, 1)
PAD = 5
H, Wt = m.shape[0] + 2 * PAD, m.shape[1] + 2 * PAD
M = np.zeros((H, Wt)); M[PAD:PAD + m.shape[0], PAD:PAD + m.shape[1]] = m
def mau(hex_): return np.array([int(hex_[i:i + 2], 16) for i in (1, 3, 5)], float)
def dung(M, loi, ngoai, sang, quang, n, toc, lap_lanh=True, seed=3, qg=3.4, qa=0.8):
    """loi/ngoai: màu lõi chữ (giữa→viền), sang: màu vệt sáng chạy qua, quang: màu quầng"""
    H, W = M.shape
    glow = np.array(Image.fromarray((M * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.2))).astype(float) / 255
    glow = np.clip(glow * qg, 0, 1)
    rnd = random.Random(seed)
    ys_, xs_ = np.nonzero(M > 0.6)
    sao = []
    for _ in range(4):
        i = rnd.randrange(len(xs_)); sao.append((xs_[i], ys_[i], rnd.uniform(0, 1)))
    khung = []
    yy, xx = np.mgrid[:H, :W]
    for f in range(n):
        k = f / n
        img = np.zeros((H, W, 4))
        # quầng
        img[:, :, :3] = quang; img[:, :, 3] = glow * (qa + 0.15 * math.sin(k * 2 * math.pi))
        # lõi chữ: chuyển màu theo hàng (trên sáng, dưới đậm)
        g = (yy - PAD) / max(1, M.shape[0] - 2 * PAD)
        core = loi[None, None, :] * (1 - g[:, :, None]) + ngoai[None, None, :] * g[:, :, None]
        # vệt sáng chéo chạy ngang
        vx = -10 + (W + 20) * k
        band = np.clip(1 - np.abs((xx + (yy - H / 2) * 0.6) - vx) / 5.0, 0, 1)
        core = core * (1 - band[:, :, None] * 0.85) + sang[None, None, :] * band[:, :, None] * 0.85
        a = M
        img[:, :, :3] = img[:, :, :3] * (1 - a[:, :, None]) + core * a[:, :, None]
        img[:, :, 3] = np.maximum(img[:, :, 3], a)
        if lap_lanh:
            for (sx, sy, ph) in sao:
                v = math.sin(((k + ph) % 1) * math.pi) ** 3
                if v < 0.15: continue
                L = 1 + int(round(3 * v))
                for d in range(-L, L + 1):
                    for (px, py) in ((int(sx) + d, int(sy)), (int(sx), int(sy) + d)):
                        if 0 <= px < W and 0 <= py < H:
                            al = v * (1 - abs(d) / (L + 1))
                            img[py, px, :3] = img[py, px, :3] * (1 - al) + 255 * al
                            img[py, px, 3] = max(img[py, px, 3], al)
        khung.append(Image.fromarray(np.clip(img, 0, 255).astype(np.uint8) if False else np.dstack([np.clip(img[:, :, :3], 0, 255), np.clip(img[:, :, 3] * 255, 0, 255)]).astype(np.uint8), 'RGBA'))
    return khung
def luu(khung, ten):
    w, h = khung[0].size; st = Image.new('RGBA', (w * len(khung), h))
    for i, k in enumerate(khung): st.alpha_composite(k, (i * w, 0))
    st.save(OUT + '/' + ten + '.png', optimize=True); print(ten, w, h, len(khung))
lt = dung(M, mau('#f0ffc8'), mau('#5dff4a'), mau('#ffffff'), mau('#13b522'), 15, 1)
luu(lt, 'langtuyet')
# ---- Vô Song: giữ nét chữ gốc (ff_vosong), đổi sang vàng kim óng ánh
d = spr2png.doc(F + 'ff_vosong.spr')
nen = Image.new('RGBA', (d['w'], d['h']))
for im, ox, oy in d['frames']:
    c = Image.new('RGBA', (d['w'], d['h'])); c.alpha_composite(im, (ox, oy))
    nen = Image.fromarray(np.minimum(np.array(nen).astype(int) if nen.getbbox() else np.array(c).astype(int), np.array(c).astype(int)).astype(np.uint8)) if nen.getbbox() else c
# nen = phần chung mọi khung (chữ, không có tia lấp lánh)
a = np.array(nen).astype(float)
lum = a[:, :, :3].mean(axis=2) / 255 * (a[:, :, 3] / 255)
bb = Image.fromarray((np.clip(lum * 1.6, 0, 1) * 255).astype(np.uint8)).getbbox()
lum = lum[bb[1]:bb[3], bb[0]:bb[2]]
M2 = np.zeros((lum.shape[0] + 2 * PAD, lum.shape[1] + 2 * PAD)); M2[PAD:-PAD, PAD:-PAD] = np.clip(lum * 1.5, 0, 1)
vs = dung(M2, mau('#fffbe0'), mau('#ffc61a'), mau('#ffffff'), mau('#c87400'), 15, 1, seed=9, qg=1.6, qa=0.45)
luu(vs, 'vosong')
