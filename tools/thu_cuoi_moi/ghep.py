# Ghép sprite thú cưỡi Nghịch Tiên (ảnh lẻ đã cắt sát, mỗi khung 1 file) -> tấm sheet 4 hàng
# Hàng: 0 xuống, 1 trái, 2 phải, 3 lên.  Mỗi hàng: [khung đi ...][khung đứng ...]
# Dùng: python3 ghep.py <cau_hinh.json> <ten> <thu_muc_ra>
import sys, json, glob, re, numpy as np
from PIL import Image
from scipy import ndimage

CH = json.load(open(sys.argv[1]))[sys.argv[2]]
OUT = sys.argv[3]
K = CH["k"]

def so(f): return int(re.findall(r"(\d+)\.png$", f)[0])
def nhom(mau):
    ds = sorted(glob.glob(mau), key=so); assert ds, mau
    return ds
def nap(f, lat=False, k=None):
    k = k or K
    im = Image.open(f).convert("RGBA")
    im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    if lat: im = im.transpose(Image.FLIP_LEFT_RIGHT)
    a = np.array(im)
    # bỏ hạt vụn tách rời quá nhỏ
    al = a[:, :, 3] > 40
    lab, n = ndimage.label(al)
    if n > 1:
        sz = ndimage.sum(al, lab, range(1, n + 1))
        giu = np.isin(lab, [i + 1 for i in range(n) if sz[i] >= 6])
        a[~giu] = 0
    return a

PAD = 60
def dat(a, dx, dy, H, W):
    o = np.zeros((H, W, 4), np.uint8)
    y0 = H - PAD - a.shape[0] + dy; x0 = (W - a.shape[1]) // 2 + dx
    o[y0:y0 + a.shape[0], x0:x0 + a.shape[1]] = a
    return o
LOI = None   # chỉ lấy dải giữa rộng LOI px để căn (thân chim, bỏ cánh)
def mat(o):
    m = (o[:, :, 3] > 100).astype(np.float32)
    if LOI:
        xs = np.nonzero(m.any(0))[0]
        if len(xs):
            c = int(np.average(np.arange(m.shape[1]), weights=m.sum(0))); m[:, :max(0, c - LOI)] = 0; m[:, c + LOI:] = 0
    return m

def can_hang(ds_anh, tham_chieu=None, r=10, chi_x=False):
    """Căn các khung theo khung tham chiếu bằng tương quan mặt nạ alpha (đáy-giữa làm điểm khởi đầu)."""
    H = max(a.shape[0] for a in ds_anh) + 2 * PAD; W = max(a.shape[1] for a in ds_anh) + 2 * PAD
    if tham_chieu is not None:
        H = max(H, tham_chieu.shape[0]); W = max(W, tham_chieu.shape[1])
    goc = dat(ds_anh[0], 0, 0, H, W) if tham_chieu is None else np.pad(tham_chieu, ((0, H - tham_chieu.shape[0]), (0, W - tham_chieu.shape[1]), (0, 0)))
    m0 = mat(goc)
    ra = []
    for a in ds_anh:
        best, bs = (0, 0), -1
        for dy in ([0] if chi_x else range(-r, r + 1)):
            for dx in range(-r, r + 1):
                m = mat(dat(a, dx, dy, H, W))
                s = (m * m0).sum() / max(1.0, np.sqrt(m.sum() * m0.sum()))
                if s > bs: bs, best = s, (dx, dy)
        ra.append(dat(a, best[0], best[1], H, W))
    return ra, goc

lat_ngang = CH["ngang_huong"] == "trai"     # ảnh ngang gốc quay sang trái -> hàng phải phải lật
HANG = {}
for ten_hang, mau, lat in [("xuong", CH["xuong"], False), ("trai", CH["ngang"], not lat_ngang is False and False), ("len", CH["len"], False)]:
    pass
src = CH["src"]
xuong = [nap(f) for f in nhom(src + CH["xuong"])]
len_ = [nap(f) for f in nhom(src + CH["len"])]
ngang_goc = nhom(src + CH["ngang"])
trai = [nap(f, lat=not lat_ngang) for f in ngang_goc]   # hàng trái: mặt quay trái
phai = [nap(f, lat=lat_ngang) for f in ngang_goc]
dung = [nap(f, k=CH.get("k_dung")) for f in nhom(src + CH["dung"])] if CH.get("dung") else []

chi_x = CH.get("chi_x", False)
r = CH.get("r", 10)
hang = {}
LOI = CH.get("loi")
a, g = can_hang(xuong, r=r, chi_x=chi_x); hang[0] = a
if dung:
    b, _ = can_hang(dung, tham_chieu=g, r=r, chi_x=chi_x); hang["dung0"] = b
hang[3], _ = can_hang(len_, r=r, chi_x=chi_x)
LOI = None
hang[1], _ = can_hang(trai, r=r, chi_x=chi_x)
hang[2], _ = can_hang(phai, r=r, chi_x=chi_x)

# khung đứng mỗi hàng
dung_hang = {}
for d in range(4):
    if CH.get("dung_la_di"): dung_hang[d] = []                 # đứng = vẫn lặp dáng đi (bay vỗ cánh)
    elif d == 0 and dung: dung_hang[d] = hang["dung0"]
    else: dung_hang[d] = [hang[d][CH.get("khung_dung", 0)]]

# đưa mỗi hàng về ô chung: tâm x theo trung vị tâm bbox, đáy theo trung vị đáy
def bbox(o):
    ys, xs = np.nonzero(o[:, :, 3] > 100); return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1
cac = []
for d in range(4):
    ds = hang[d] + dung_hang[d]
    bb = [bbox(o) for o in hang[d]]
    cx = float(np.median([(b[0] + b[2]) / 2 for b in bb]))
    if d in (1, 2) and CH.get("tam_ngang") is not None:
        # hàng ngang: tâm yên lệch về phía đầu một chút (tam_ngang = tỉ lệ từ đuôi -> đầu)
        x0 = float(np.median([b[0] for b in bb])); x1 = float(np.median([b[2] for b in bb]))
        t = CH["tam_ngang"]; cx = x0 + (x1 - x0) * (t if d == 2 else 1 - t)
    day = float(np.median([b[3] for b in bb])) - CH.get("nhac", {}).get(str(d), 0) * K
    if CH.get("bay"):   # thú bay: lấy tâm khối (trọng tâm) làm mốc thay cho đáy
        day = float(np.median([np.average(np.nonzero(o[:, :, 3] > 100)[0]) for o in hang[d]])) + CH["bay"]
    cac.append((ds, cx, day))
# kích thước ô
L = R = T = 0
for ds, cx, day in cac:
    for o in ds:
        b = bbox(o); L = max(L, cx - b[0]); R = max(R, b[2] - cx); T = max(T, day - b[1])
D = 0
for ds, cx, day in cac:
    for o in ds:
        b = bbox(o); D = max(D, b[3] - day)
HA = [int(CH.get("ha", {}).get(str(d), 0)) for d in range(4)]   # hạ nội dung hàng d xuống (để nâng người cưỡi theo hướng)
HALF = int(np.ceil(max(L, R))) + 1
FW = 2 * HALF; GY = int(np.ceil(T)) + 1; FH = GY + int(np.ceil(D)) + 1 + max(HA)
so_di = [len(hang[d]) for d in range(4)]; so_dung = [len(dung_hang[d]) for d in range(4)]
COT = max(so_di[d] + so_dung[d] for d in range(4))
sheet = Image.new("RGBA", (FW * COT, FH * 4))
for d, (ds, cx, day) in enumerate(cac):
    for c, o in enumerate(ds):
        im = Image.fromarray(o)
        sheet.alpha_composite(im, (int(round(c * FW + HALF - cx)), int(round(d * FH + GY + HA[d] - day))))
arr = np.array(sheet)
arr[:, :, 3] = np.where(arr[:, :, 3] > 110, 255, 0); arr[arr[:, :, 3] == 0] = 0
Image.fromarray(arr).quantize(256, method=Image.FASTOCTREE).save(f"{OUT}/sheet.png", optimize=True)
meta = {"fw": FW, "fh": FH, "gy": GY, "ha": HA, "cot": COT, "di": so_di, "dung": so_dung}
json.dump(meta, open(f"{OUT}/meta.json", "w")); print(sys.argv[2], meta)
# icon: khung đứng hướng xuống
o = (dung_hang[0] or hang[0])[0]; b = bbox(o); im = Image.fromarray(o).crop(b)
s = 60 / max(im.size); im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
ic = Image.new("RGBA", (64, 64)); ic.alpha_composite(im, ((64 - im.width) // 2, (64 - im.height) // 2))
ic.save(f"{OUT}/icon.png", optimize=True)
