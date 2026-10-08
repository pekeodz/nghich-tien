# Cắt tấm hiệu ứng Huyền Âm Trảm: 2 hàng đao khí (8 khung), 1 hàng bùng độc (4), 1 hàng bãi độc (3)
import numpy as np, json, sys
from PIL import Image
SRC=sys.argv[1]; OUT=sys.argv[2]; K=float(sys.argv[3]) if len(sys.argv)>3 else 0.6
A=Image.open(SRC).convert('RGBA'); a=np.array(A)
def cat(y0,y1,cuts):
    fr=[]
    for i in range(len(cuts)-1):
        c=A.crop((cuts[i],y0,cuts[i+1],y1)); bb=c.getchannel('A').point(lambda v:255 if v>12 else 0).getbbox(); fr.append(c.crop(bb))
    return fr
khi=cat(30,140,[0,252,505,756,1024])+cat(168,290,[0,255,510,766,1024])
no=cat(298,566,[0,253,510,778,1024])
vung=cat(575,826,[0,340,683,1024])
meta={}
def strip(ten,fr,canh):
    W=max(f.width for f in fr); H=max(f.height for f in fr)
    w,h=round(W*K),round(H*K); st=Image.new('RGBA',(w*len(fr),h))
    for i,f in enumerate(fr):
        c=Image.new('RGBA',(W,H))
        x=W-f.width if canh=='phai' else (W-f.width)//2
        c.alpha_composite(f,(x,(H-f.height)//2))
        st.alpha_composite(c.resize((w,h),Image.LANCZOS),(i*w,0))
    st.save(OUT+'/'+ten+'.png',optimize=True); meta[ten]=dict(w=w,h=h,n=len(fr))
strip('khi',khi,'phai'); strip('no',no,'giua'); strip('vung',vung,'giua')
print(json.dumps(meta))
