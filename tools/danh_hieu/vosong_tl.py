# Vô Song theo đúng kiểu chữ + hiệu ứng của Tiềm Long (tiemlong.spr), chỉ đổi chữ và màu (vàng kim)
import sys, numpy as np
sys.path.insert(0, '/tmp/claude-0/sprmod')
import spr2png
from PIL import Image, ImageFilter
from scipy import ndimage as nd
F = sys.argv[1]; OUT = sys.argv[2]
d = spr2png.doc(F + 'tiemlong.spr'); W0, H0 = d['w'], d['h']
TL = []
for im, ox, oy in d['frames']:
    c = Image.new('RGBA', (W0, H0)); c.alpha_composite(im, (ox, oy)); TL.append(np.array(c).astype(float))
TL = np.array(TL)
a0 = TL[0]
core0 = (np.abs(a0[..., :3] - [237, 191, 0]).sum(axis=2) < 60) & (a0[..., 3] >= 250)
def G(s): return np.array([[c == '#' for c in r] for r in s.strip('\n').split('\n')])
# chữ vẽ tay theo nét Tiềm Long (cao 9 điểm, hàng 12..20)
V = G("""
#...#
#...#
#...#
#...#
.#.#.
.#.#.
.#.#.
..#..
..#..""")
S = G("""
.###.
#...#
#....
.#...
..##.
....#
....#
#...#
.###.""")
mu = G("""
.#.
#.#""")
lt = core0[:, 8:12]                     # '<'
ong = core0[:, 40:59]                   # 'ong>'
o_ = core0[:, 40:45]                    # 'o' của Long
# ghép mặt nạ lõi chữ
M = np.zeros((H0, 70), bool); x = 0
def dat(g, x, y0=None):
    if y0 is None: M[:g.shape[0], x:x + g.shape[1]] |= g
    else: M[y0:y0 + g.shape[0], x:x + g.shape[1]] |= g
    return x + g.shape[1]
x = dat(lt, 0) + 1
x = dat(V, x, 12) + 1
xo = x; x = dat(o_, x)                  # ô = o + dấu mũ
dat(mu, xo + 1, 12) ; x += 3
x = dat(S, x, 12) + 1
x = dat(ong[:, 0:], x)
ys, xs = np.nonzero(M); w = xs.max() + 1
# căn giữa như Tiềm Long (chữ gốc nằm cột 8..58)
x0 = 8 + ((59 - 8) - w) // 2
core = np.zeros((H0, W0), bool); core[:, x0:x0 + w] = M[:, :w]
# viền tối: nới 1 điểm quanh lõi
vien = nd.binary_dilation(core, structure=np.ones((3, 3))) & ~core
# quầng: học từ Tiềm Long — alpha = f(độ mờ của chữ)
def mo(m): return np.array(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2.6))).astype(float) / 255
chu0 = core0 | (nd.binary_dilation(core0, structure=np.ones((3, 3))) & (a0[..., 3] >= 250))
B0 = mo(chu0); g = (a0[..., 3] < 250) & (B0 > 0.02)
k = np.median(a0[..., 3][g] / B0[g])
B = mo(core | vien); quang = np.clip(B * k * 0.62, 0, 255)
def hex_(h): return np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], float)
LOI, VIEN, QUANG = hex_('#fff1a8'), hex_('#8c5a00'), hex_('#e89a00')
base = np.zeros((H0, W0, 4))
base[..., :3] = QUANG; base[..., 3] = quang
base[vien, :3] = VIEN; base[vien, 3] = 255
base[core, :3] = LOI; base[core, 3] = 255
# tia sáng lấp lánh: lấy đúng từng khung của Tiềm Long (độ trắng thêm vào so với khung 0)
def lum(a): return a[..., :3].max(axis=2) * a[..., 3] / 255
L0 = lum(a0)
khung = []
for f in range(len(TL)):
    af = TL[f]; Lf = lum(af)
    t = np.clip((Lf - L0) / np.maximum(1, 255 - L0), 0, 1)
    trang = (af[..., 0] > 200) & (af[..., 1] > 200) & (af[..., 2] > 150)
    t = np.where(trang, np.maximum(t, 0.85), t)
    them = np.clip(af[..., 3] - a0[..., 3], 0, 255)
    # tia sao giữ nguyên ở chỗ trống; trên nét chữ cũ thì bỏ (kẻo hiện bóng chữ "Tiềm"),
    # thay bằng độ sáng nhòe của ngôi sao phủ lên nét chữ mới
    chuCu = a0[..., 3] >= 250
    tia = np.where(chuCu, 0, t)
    sao = np.array(Image.fromarray((t * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6))).astype(float) / 255
    tChu = np.where(core, np.clip(sao * 1.8, 0, 0.95), np.where(vien, np.clip(sao * 0.5, 0, 0.35), 0))
    t = np.maximum(tia * ~(core | vien), tChu)
    o = base.copy()
    o[..., :3] = o[..., :3] * (1 - t[..., None]) + 255 * t[..., None]
    o[..., 3] = np.maximum(o[..., 3], np.where(t > 0.05, them, 0))
    khung.append(Image.fromarray(np.clip(o, 0, 255).astype(np.uint8), 'RGBA'))
# cắt sát như các dải khác
bb = None
for k_ in khung:
    b = k_.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox()
    bb = b if bb is None else (min(bb[0], b[0]), min(bb[1], b[1]), max(bb[2], b[2]), max(bb[3], b[3]))
khung = [k_.crop(bb) for k_ in khung]
w, h = khung[0].size; st = Image.new('RGBA', (w * len(khung), h))
for i, k_ in enumerate(khung): st.alpha_composite(k_, (i * w, 0))
st.save(OUT + '/vosong.png', optimize=True); print('vosong', w, h, len(khung), 'k=%.1f' % k)
# khung Tiềm Long đã cắt để so
