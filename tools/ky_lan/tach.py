# Tách tấm sprite kỳ lân (nền trắng, 4 hàng: lên, xuống, trái, phải; mỗi hàng 8 khung) thành khung RGBA.
import numpy as np, json, sys
from PIL import Image
from scipy import ndimage as nd
SRC=sys.argv[1]; OUT=sys.argv[2]
im=np.array(Image.open(SRC).convert('RGB')).astype(np.float32)
H,W,_=im.shape
mn=im.min(axis=2); mx=im.max(axis=2)
# xoá chữ tiêu đề (đen/xám, ít bão hoà) trong các vùng nhãn
lab=np.zeros((H,W),bool)
for (x0,y0,x1,y1) in [(0,0,1024,27),(0,140,200,170),(410,140,620,170),(0,278,330,302),(0,415,220,441)]:
    lab[y0:y1,x0:x1]=True
chu=lab&((mx-mn)<70)
im[chu]=255; mn=im.min(axis=2); mx=im.max(axis=2)
gan_trang=(mn>226)&((mx-mn)<28)
# nền = vùng gần trắng nối với mép ảnh
lb,n=nd.label(gan_trang)
mep=set(np.unique(np.concatenate([lb[0],lb[-1],lb[:,0],lb[:,-1]])))-{0}
nen=np.isin(lb,list(mep))
sz=np.bincount(lb.ravel())
lo_kin=(sz>=6); lo_kin[0]=False
nen|=lo_kin[lb]   # vùng trắng bị bao kín (khoang miệng, giữa râu) cũng là nền
fg=~nen
fg=nd.binary_opening(fg,iterations=1)|(fg&(mn<200))
# alpha mép: điểm fg kề nền
ke=fg&nd.binary_dilation(~fg,iterations=1)
alpha=np.where(fg,1.0,0.0)
a_mep=np.clip((255-mn)/110.0,0.15,1.0)
alpha=np.where(ke,a_mep,alpha)
rgb=im.copy()
aa=np.maximum(alpha,1e-3)[...,None]
rgb=np.where(ke[...,None],np.clip((im-(1-aa)*255)/aa,0,255),rgb)
RGBA=np.dstack([rgb,alpha*255]).astype(np.uint8)
np.save(OUT+'/fg.npy',fg)
Image.fromarray(RGBA).save(OUT+'/sach.png')
print('ok',fg.mean())
