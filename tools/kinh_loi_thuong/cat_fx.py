# Hiệu ứng đánh thường Kinh Lôi Thương: 9 khung (rồng sét giáng xuống -> nổ -> tan)
# Căn mọi khung theo điểm sét chạm đất, ghép 1 dải ngang -> kinh_loi_thuong_fx.png
import sys, glob, json, numpy as np
from PIL import Image
from scipy import ndimage
SRC = sys.argv[1] if len(sys.argv) > 1 else "fx"
OUT = sys.argv[2] if len(sys.argv) > 2 else "out"
fs = sorted(glob.glob(f"{SRC}/frame_hieu_ung_*.png"))
fr = []
for i, f in enumerate(fs):
    a = np.array(Image.open(f).convert("RGBA"))
    al = a[:, :, 3] > 30
    lab, n = ndimage.label(al)
    sz = ndimage.sum(al, lab, range(1, n + 1))
    # bỏ chữ số / chấm lẻ xa thân hiệu ứng
    lon = sz.max() if n else 0
    giu = np.isin(lab, [k + 1 for k in range(n) if sz[k] >= max(30, lon * 0.01)])
    obj = ndimage.find_objects(lab)
    chinh = int(np.argmax(sz))
    ys0, xs0 = obj[chinh]
    for k in range(n):
        if not giu[obj[k]].any(): continue
        ys, xs = obj[k]
        if sz[k] < lon * 0.05 and (ys.stop < ys0.start - 6 or ys.start > ys0.stop + 6 or xs.stop < xs0.start - 6 or xs.start > xs0.stop + 6):
            giu[lab == k + 1] = False
    a[~giu] = 0
    lum = a[:, :, :3].astype(int).sum(2)
    sang = (a[:, :, 3] > 200) & (lum > 640)
    ys, xs = np.nonzero(a[:, :, 3] > 30)
    if i < 5:   # sét đang giáng: điểm chạm = đáy tia, giữa theo phần sáng ở 15% dưới cùng
        day = ys.max(); vung = (np.arange(a.shape[0])[:, None] > day - (day - ys.min()) * 0.15) & (a[:, :, 3] > 30)
        cx = np.nonzero(vung)[1].mean(); cy = day - 4
    else:       # nổ: tâm = trọng tâm phần sáng nhất
        yy, xx = np.nonzero(sang) if sang.sum() > 20 else np.nonzero(a[:, :, 3] > 30)
        cx, cy = xx.mean(), yy.mean()
    fr.append((a, cx, cy))
L = max(int(np.ceil(max(f[1], f[0].shape[1] - f[1]))) for f in fr)
T = max(int(np.ceil(f[2])) for f in fr); B = max(int(np.ceil(f[0].shape[0] - f[2])) for f in fr)
fw, fh = 2 * L + 4, T + B + 4
ax, ay = L + 2, T + 2
dai = Image.new("RGBA", (fw * len(fr), fh))
for i, (a, cx, cy) in enumerate(fr):
    dai.alpha_composite(Image.fromarray(a), (int(i * fw + ax - round(cx)), int(ay - round(cy))))
K = 0.6   # thu nhỏ lưu file
dai = dai.resize((round(dai.width * K), round(dai.height * K)), Image.LANCZOS)
fw2 = dai.width // len(fr)
dai.quantize(256, method=Image.FASTOCTREE).save(f"{OUT}/kinh_loi_thuong_fx.png", optimize=True)
meta = {"fw": fw2, "fh": dai.height, "frames": len(fr), "ax": round(ax * K), "ay": round(ay * K)}
json.dump(meta, open(f"{OUT}/fx.json", "w")); print(meta)
