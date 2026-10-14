# Kinh Lôi Thương: căn 12 khung (thương + sét) cho thẳng hàng, xoay mũi thương lên trên, ghép thành 1 dải
# -> kinh_loi_thuong_bay.png (12 khung ngang), icon 64x64.
import sys, glob, json, numpy as np
from PIL import Image
SRC = sys.argv[1] if len(sys.argv) > 1 else "src"
OUT = sys.argv[2] if len(sys.argv) > 2 else "out"
fs = sorted(glob.glob(f"{SRC}/frame_aura_vu_khi_*.png"))
anh = [np.array(Image.open(f).convert("RGBA")) for f in fs]

def toi(a):   # phần thép tối của cán/đầu thương — không đổi giữa các khung, dùng để căn
    al = a[:, :, 3] > 60; lum = a[:, :, :3].astype(int).mean(2)
    return (al & (lum < 70)).astype(np.float32)

H = max(a.shape[0] for a in anh) + 40; W = max(a.shape[1] for a in anh) + 40
def dat(a, dx, dy):
    o = np.zeros((H, W, 4), np.uint8); o[20 + dy:20 + dy + a.shape[0], 20 + dx:20 + dx + a.shape[1]] = a; return o
goc = toi(dat(anh[0], 0, 0))
can = [dat(anh[0], 0, 0)]
for a in anh[1:]:
    best, bs = None, -1
    for dy in range(-14, 15):
        for dx in range(-14, 15):
            if not (0 <= 20 + dy and 20 + dy + a.shape[0] <= H and 0 <= 20 + dx and 20 + dx + a.shape[1] <= W): continue
            s = (toi(dat(a, dx, dy)) * goc).sum()
            if s > bs: bs, best = s, (dx, dy)
    can.append(dat(a, *best))
    print("lech", best)

# trục thương (PCA trên phần tối của khung 1)
ys, xs = np.nonzero(goc)
cx, cy = xs.mean(), ys.mean()
cov = np.cov(np.vstack([xs - cx, ys - cy]))
w, v = np.linalg.eigh(cov); ax = v[:, np.argmax(w)]
if ax[1] > 0: ax = -ax                      # hướng về mũi (mũi ở trên-trái)
gocdo = np.degrees(np.arctan2(ax[1], ax[0]))  # góc trục so với trục x
xoay = -90 - gocdo                            # xoay để mũi chỉ thẳng lên (-90°)
print("goc truc", gocdo, "xoay", xoay)
out = []
for a in can:
    im = Image.fromarray(a).rotate(-xoay, resample=Image.BICUBIC, center=(cx, cy), expand=False)
    out.append(im)
# cắt chung
bb = None
for im in out:
    b = im.getbbox()
    bb = b if bb is None else (min(bb[0], b[0]), min(bb[1], b[1]), max(bb[2], b[2]), max(bb[3], b[3]))
out = [im.crop(bb) for im in out]
fw, fh = out[0].size
# đầu mũi & đuôi cán theo phần tối (khung 1 sau khi xoay)
t1 = toi(np.array(out[0])); ys2, xs2 = np.nonzero(t1)
tip_y, butt_y = int(ys2.min()), int(ys2.max()); truc_x = float(np.median(xs2))
dai = Image.new("RGBA", (fw * len(out), fh))
for i, im in enumerate(out): dai.alpha_composite(im, (i * fw, 0))
dai.quantize(256, method=Image.FASTOCTREE).save(f"{OUT}/kinh_loi_thuong_bay.png", optimize=True)
meta = {"fw": fw, "fh": fh, "frames": len(out), "trucX": round(truc_x, 1), "mui": tip_y, "duoi": butt_y}
json.dump(meta, open(f"{OUT}/meta.json", "w")); print(meta)
# icon từ ảnh vuông có khung
ic = Image.open(f"{SRC}/icon_goc.png").convert("RGBA").resize((64, 64), Image.LANCZOS)
ic.save(f"{OUT}/icon_kinh_loi_thuong.png", optimize=True)
