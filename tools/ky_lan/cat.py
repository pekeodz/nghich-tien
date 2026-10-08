# Cắt khung + căn theo tâm yên tím. Ra frames.json + khung_*.png
import numpy as np, json
from PIL import Image
A=np.array(Image.open('sach.png')).astype(np.float32)
al=A[...,3]>20
def cot_mat(y0,y1): return al[y0:y1].sum(axis=0)
def cat_khe(y0,y1):
    c=cot_mat(y0,y1); segs=[];s=None
    for x,v in enumerate(c):
        if v>0 and s is None: s=x
        if v==0 and s is not None: segs.append([s,x]); s=None
    if s is not None: segs.append([s,len(c)])
    lon=[g for g in segs if g[1]-g[0]>35]
    cuts=[0]+[ (lon[i][1]+lon[i+1][0])//2 for i in range(len(lon)-1)]+[1024]
    return [[(cuts[i],cuts[i+1])] for i in range(len(lon))]
def seam(y0,y1,xc,r=34):
    # đường cắt dọc tốn ít điểm ảnh nhất trong cửa sổ [xc-r,xc+r], mỗi hàng lệch tối đa 2
    M=al[y0:y1,xc-r:xc+r].astype(float); h,w=M.shape
    C=M.copy(); B=np.zeros((h,w),int)
    for y in range(1,h):
        for x in range(w):
            lo,hi=max(0,x-2),min(w,x+3); k=lo+np.argmin(C[y-1,lo:hi]); C[y,x]+=C[y-1,k]; B[y,x]=k
    x=int(np.argmin(C[-1])); p=[0]*h
    for y in range(h-1,-1,-1): p[y]=x+xc-r; x=B[y,x]
    return p
def cat_seam(y0,y1,n=8):
    seams=[[0]*(y1-y0)]+[seam(y0,y1,k*128+(1024-n*128)//2*0) for k in range(1,n)]+[[1024]*(y1-y0)]
    return seams
khung=[]
def luu(ten,y0,y1,maskfn):
    sub=A[y0:y1].copy(); m=maskfn(); sub[...,3]*=m
    ys,xs=np.nonzero(sub[...,3]>20)
    bx0,bx1,by0,by1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
    cr=sub[by0:by1,bx0:bx1]
    r,g,b=cr[...,0],cr[...,1],cr[...,2]
    tim=(b>r*0.75)&(b>g+35)&(r>70)&(cr[...,3]>200)
    ty,tx=np.nonzero(tim)
    info=dict(ten=ten,w=int(bx1-bx0),h=int(by1-by0),cx=float(tx.mean()),cy=float(ty.mean()),ytren=int(ty.min()),ntim=int(tim.sum()),day=int(by1-by0))
    Image.fromarray(cr.astype(np.uint8)).save('khung_%s.png'%ten); khung.append(info)
for hang,(y0,y1) in [('len',(27,140)),('xuong',(140,278))]:
    for i,rg in enumerate(cat_khe(y0,y1)):
        (a,b)=rg[0]
        def mk(a=a,b=b):
            m=np.zeros((y1-y0,1024)); m[:,a:b]=1; return m
        luu('%s%d'%(hang,i),y0,y1,mk)
y0,y1=438,572
S=cat_seam(y0,y1)
for i in range(8):
    def mk(i=i):
        m=np.zeros((y1-y0,1024))
        for y in range(y1-y0): m[y,S[i][y]:S[i+1][y]]=1
        return m
    luu('phai%d'%i,y0,y1,mk)
json.dump(khung,open('frames.json','w'),indent=0)
for k in khung: print(k)
