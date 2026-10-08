# Dựng sheet kỳ lân mới: 10 cột (8 chạy + 2 đứng) x 4 hàng (xuống, trái, phải, lên)
import numpy as np, json, sys
from PIL import Image
S=float(sys.argv[1]) if len(sys.argv)>1 else 0.75
K={k['ten']:k for k in json.load(open('frames.json'))}
def neo(ten):
    a=np.array(Image.open('khung_%s.png'%ten)).astype(float); al=a[...,3]>128; h,w=al.shape
    r,g,b=a[...,0],a[...,1],a[...,2]
    tim=(b>140)&(b>r*0.85)&(g<130)&(r>90)&al
    day=np.nonzero(al.sum(axis=1)>=3)[0].max()
    if tim.sum()>40: x=np.nonzero(tim)[1].mean()
    else:
        ys,xs=np.nonzero(al[int(h*0.45):int(h*0.75)]); x=xs.mean()
    return Image.open('khung_%s.png'%ten), x, day
hang={'xuong':[neo('xuong%d'%i) for i in range(8)],'phai':[neo('phai%d'%i) for i in range(8)],'len':[neo('len%d'%i) for i in range(8)]}
L=max(x for v in hang.values() for (_,x,_) in v); R=max(im.width-x for v in hang.values() for (im,x,_) in v)
T=max(d for v in hang.values() for (_,_,d) in v); B=max(im.height-d for v in hang.values() for (im,_,d) in v)
FW=int(np.ceil(max(L,R)*2))+4; FH=int(np.ceil(T+B))+4; AX=FW/2; AY=T+2
print('khung goc',FW,FH,'neo',AX,AY)
def dat(im,x,d,lat=False):
    c=Image.new('RGBA',(FW,FH)); c.alpha_composite(im,(int(round(AX-x)),int(round(AY-d))))
    return c.transpose(Image.FLIP_LEFT_RIGHT) if lat else c
cot=list(range(8))+[0,0]
rows=[[dat(*hang['xuong'][i]) for i in cot],[dat(*hang['phai'][i],lat=True) for i in cot],[dat(*hang['phai'][i]) for i in cot],[dat(*hang['len'][i]) for i in cot]]
fw,fh=round(FW*S),round(FH*S)
sh=Image.new('RGBA',(fw*10,fh*4))
for r,rw in enumerate(rows):
    for c,im in enumerate(rw): sh.alpha_composite(im.resize((fw,fh),Image.LANCZOS),(c*fw,r*fh))
sh.save('sheet.png',optimize=True)
json.dump({k:float(v) for k,v in dict(fw=fw,fh=fh,ax=AX*S,ay=AY*S,S=S,FW=FW,FH=FH,AX=AX,AY=AY).items()},open('sheet.json','w'))
print(fw,fh,AX*S,AY*S, sh.size)
# Hướng xuống: kỳ lân hạ thấp thêm LECH_XUONG px trong khung (người cưỡi được nâng thêm bằng ấy qua mount.hoverHuong)
LECH_XUONG=int(sys.argv[2]) if len(sys.argv)>2 else 14
s2=Image.new('RGBA',(fw*10,fh+LECH_XUONG)); s2=Image.new('RGBA',(fw*10,(fh+LECH_XUONG)*4))
for r in range(4):
    s2.alpha_composite(sh.crop((0,r*fh,fw*10,(r+1)*fh)),(0,r*(fh+LECH_XUONG)+(LECH_XUONG if r==0 else 0)))
s2.save('sheet.png',optimize=True); print('sheet', s2.size, 'frameH', fh+LECH_XUONG)
