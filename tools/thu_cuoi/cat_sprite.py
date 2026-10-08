# Cắt sprite thú cưỡi có nền trong suốt: 4 hàng (lên, xuống, trái, phải) x 8 khung.
# Neo ngang = tâm vùng màu yên (đỏ), neo dọc = chân (hàng thấp nhất). Ra sheet 10 cột x 4 hàng (xuống, trái, phải, lên).
import numpy as np, sys, json
from PIL import Image
SRC=sys.argv[1]; S=float(sys.argv[2]); LECH_XUONG=int(sys.argv[3]); OUT=sys.argv[4]
A=np.array(Image.open(SRC).convert('RGBA')).astype(np.float32)
A[A[...,3]<12]=0
al=A[...,3]>40
prof=al.sum(axis=1); bands=[];s=None
for y,v in enumerate(prof):
    if v>0 and s is None: s=y
    if v==0 and s is not None:
        if y-s>30: bands.append((s,y))
        s=None
assert len(bands)==4,bands
B={'len':bands[0],'xuong':bands[1],'trai':bands[2],'phai':bands[3]}
def cat_khe(y0,y1):
    c=al[y0:y1].sum(axis=0); segs=[];s=None
    for x,v in enumerate(c):
        if v>0 and s is None: s=x
        if v==0 and s is not None: segs.append([s,x]); s=None
    if s is not None: segs.append([s,len(c)])
    lon=[g for g in segs if g[1]-g[0]>30]
    return [0]+[(lon[i][1]+lon[i+1][0])//2 for i in range(len(lon)-1)]+[A.shape[1]]
def seam(y0,y1,xc,r=34):
    M=al[y0:y1,xc-r:xc+r].astype(float); h,w=M.shape; C=M.copy(); Bk=np.zeros((h,w),int)
    for y in range(1,h):
        for x in range(w):
            lo,hi=max(0,x-2),min(w,x+3); k=lo+np.argmin(C[y-1,lo:hi]); C[y,x]+=C[y-1,k]; Bk[y,x]=k
    x=int(np.argmin(C[-1])); p=[0]*h
    for y in range(h-1,-1,-1): p[y]=x+xc-r; x=Bk[y,x]
    return p
def khung_hang(ten):
    y0,y1=B[ten]; h=y1-y0
    c=cat_khe(y0,y1)
    if len(c)==9: mats=[(lambda a,b:(lambda: np.pad(np.ones((h,b-a)),((0,0),(a,A.shape[1]-b)))))(c[i],c[i+1]) for i in range(8)]
    else:
        S_=[[0]*h]+[seam(y0,y1,k*128) for k in range(1,8)]+[[A.shape[1]]*h]
        def mk(i):
            def f():
                m=np.zeros((h,A.shape[1]))
                for y in range(h): m[y,S_[i][y]:S_[i+1][y]]=1
                return m
            return f
        mats=[mk(i) for i in range(8)]
    out=[]
    for f in mats:
        sub=A[y0:y1].copy(); sub[...,3]*=f()
        ys,xs=np.nonzero(sub[...,3]>40); cr=sub[ys.min():ys.max()+1,xs.min():xs.max()+1]
        a=cr[...,3]>128; r,g,b=cr[...,0],cr[...,1],cr[...,2]
        yen=(r>140)&(g<90)&(b<90)&a
        if yen.sum()>25: x=np.nonzero(yen)[1].mean()
        else:
            hh=a.shape[0]; yy,xx=np.nonzero(a[int(hh*0.45):int(hh*0.75)]); x=xx.mean()
        day=np.nonzero(a.sum(axis=1)>=3)[0].max()
        out.append((Image.fromarray(cr.astype(np.uint8)),x,day))
    return out
H={'xuong':khung_hang('xuong'),'phai':khung_hang('phai'),'len':khung_hang('len')}
L=max(x for v in H.values() for (_,x,_) in v); R=max(im.width-x for v in H.values() for (im,x,_) in v)
T=max(d for v in H.values() for (_,_,d) in v); Bo=max(im.height-d for v in H.values() for (im,_,d) in v)
FW=int(np.ceil(max(L,R)*2))+4; FH=int(np.ceil(T+Bo))+4; AX=FW/2; AY=T+2
def dat(im,x,d,lat=False):
    c=Image.new('RGBA',(FW,FH)); c.alpha_composite(im,(int(round(AX-x)),int(round(AY-d))))
    return c.transpose(Image.FLIP_LEFT_RIGHT) if lat else c
cot=list(range(8))+[0,0]
rows=[[dat(*H['xuong'][i]) for i in cot],[dat(*H['phai'][i],lat=True) for i in cot],[dat(*H['phai'][i]) for i in cot],[dat(*H['len'][i]) for i in cot]]
fw,fh=round(FW*S),round(FH*S)
sh=Image.new('RGBA',(fw*10,(fh+LECH_XUONG)*4))
for r,rw in enumerate(rows):
    for c,im in enumerate(rw): sh.alpha_composite(im.resize((fw,fh),Image.LANCZOS),(c*fw,r*(fh+LECH_XUONG)+(LECH_XUONG if r==0 else 0)))
sh.quantize(256,method=Image.FASTOCTREE).save(OUT,optimize=True)
# icon từ khung hướng phải
im,_,_=H['phai'][0]; w,h=im.size; s=max(w,h); sq=Image.new('RGBA',(s,s)); sq.paste(im,((s-w)//2,(s-h)//2)); sq.resize((64,64),Image.LANCZOS).save(OUT.replace('.png','_icon.png'))
print(json.dumps(dict(frameW=fw,frameH=fh+LECH_XUONG,anchorX=AX*S,chan=AY*S,FW=FW,FH=FH)))
