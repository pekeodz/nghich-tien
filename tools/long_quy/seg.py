# Tách nền đen bằng loang từ mép, rồi gom các mảnh thành từng khung
import numpy as np, sys, json
from PIL import Image
from scipy import ndimage as nd
f=sys.argv[1]; T=int(sys.argv[2]) if len(sys.argv)>2 else 26
a=np.array(Image.open(f+'.png').convert('RGB')).astype(int); m=a.max(axis=2)
dark=m<T
lab,n=nd.label(dark)
edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
bg=np.isin(lab,list(edge))
# lỗ đen nhỏ kín bên trong (giữa chân...) lớn > 400 px cũng coi là nền
for i in range(1,n+1):
    if i in edge: continue
    s=(lab==i); 
    if s.sum()>500: bg|=s
alpha=(~bg).astype(np.uint8)*255
rgba=np.dstack([a.astype(np.uint8),alpha]); Image.fromarray(rgba,'RGBA').save(f+'_a.png')
fg=~bg; fg2=nd.binary_dilation(fg,iterations=6)
l2,n2=nd.label(fg2); boxes=[]
for s in nd.find_objects(l2):
    y0,y1,x0,x1=s[0].start,s[0].stop,s[1].start,s[1].stop
    if (y1-y0)*(x1-x0)<400: continue
    boxes.append([x0,y0,x1,y1])
boxes.sort(key=lambda b:(b[1]//60,b[0]))
print(json.dumps(boxes))
