# Cắt vòng kiếm khí (hàng CIRCULAR SLASH) khỏi người, giữ màu xanh sáng của kiếm khí
from PIL import Image, ImageFilter
import numpy as np, sys
from scipy import ndimage as nd
A = Image.open(sys.argv[1]).convert('RGBA'); OUT = sys.argv[2]
xs = [12, 172, 340, 510, 682, 858, 1022]
fr = []
for i in range(6):
    c = np.array(A.crop((xs[i], 326, xs[i + 1], 517))).astype(int)
    r, g, b, al = c[..., 0], c[..., 1], c[..., 2], c[..., 3]
    v = np.maximum(np.maximum(r, g), b)
    loi = (al > 20) & (b > 175) & (b - r > 50)                      # xanh sáng của kiếm khí
    trang = (al > 20) & (r > 200) & (g > 225) & (b > 235)            # lõi trắng-xanh
    trang &= nd.binary_dilation(loi, iterations=6)                   # chỉ giữ phần trắng sát kiếm khí
    keep = loi | trang
    lab, n = nd.label(keep, structure=np.ones((3, 3)))
    if n:
        sz = nd.sum(keep, lab, range(1, n + 1))
        sang = nd.mean(b, lab, range(1, n + 1))
        keep = np.isin(lab, [k + 1 for k, s in enumerate(sz) if s >= 6 and (s > 400 or sang[k] > 215)])
    o = c.copy(); o[..., 3] = np.where(keep, al, 0)
    fr.append(Image.fromarray(o.astype(np.uint8)))
W = max(f.width for f in fr); H = 191
st = Image.new('RGBA', (W * 6, H))
for i, f in enumerate(fr): st.alpha_composite(f, (i * W + (W - f.width) // 2, 0))
st.save(OUT, optimize=True); print('slash', W, H, 6)
