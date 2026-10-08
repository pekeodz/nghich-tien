# Cắt khung Long Quy từ 3 tấm (đã tách nền *_a.png), chuẩn hóa cỡ, ghép 1 dải ngang cho ENEMY_DEFS
import numpy as np, json
from PIL import Image
from scipy import ndimage as nd
SH={k:Image.open(k+'_a.png') for k in ['bite','roar','shell']}
def frame(sheet,box,flip=False,keep=0.03,scale=1.0):
    im=SH[sheet].crop(box); a=np.array(im); al=a[:,:,3]>0
    lab,n=nd.label(nd.binary_dilation(al,iterations=1))
    if n>1:
        sz=nd.sum(np.ones_like(lab),lab,range(1,n+1)); big=sz.max()
        ok=np.isin(lab,[i+1 for i,s in enumerate(sz) if s>=keep*big])
        a[:,:,3]=np.where(ok&al,255,0)
    im=Image.fromarray(a); im=im.crop(im.getbbox())
    if flip: im=im.transpose(Image.FLIP_LEFT_RIGHT)
    if scale!=1.0: im=im.resize((round(im.width*scale),round(im.height*scale)),Image.LANCZOS)
    return im
def cx_body(im):
    a=np.array(im); al=a[:,:,3]>0
    cyan=(a[:,:,2]>170)&(a[:,:,1]>170)&(a[:,:,0]<170)|((a[:,:,0]>200)&(a[:,:,1]>200)&(a[:,:,2]>200))
    m=al&~cyan; h=m.shape[0]; m[:h//3]=False
    ys,xs=np.nonzero(m); return xs.mean() if len(xs) else im.width/2
def row(sheet,y0,y1,xs): return [(sheet,(xs[i],y0,xs[i+1],y1)) for i in range(len(xs)-1)]
B0=row('bite',30,220,[0,260,512,768,1024]); B1=row('bite',255,480,[0,258,512,768,1024]); B2=row('bite',515,765,[0,345,662,1024])
R0=row('roar',0,196,[0,228,432,630,812,1024]); R1=row('roar',196,382,[0,182,355,530,705,1024]); R2=row('roar',384,571,[0,170,340,500,680,840,1024]); R3=row('roar',572,735,[0,235,445,670,880])
S0=row('shell',50,232,[0,270,530,800,1024]); S1=row('shell',245,472,[0,215,470,770,1024]); S2=row('shell',505,705,[0,240,500,750,1024])
# tỉ lệ từng hàng để thân rùa cùng cỡ (đo theo khung đứng của hàng bite r1)
K_B2=0.86
ANIM=[
 ('idle',[B1[0],B1[3]]),
 ('run',[B0[0],B1[0],B0[0],B1[3]]),
 ('attack',[B0[1],B0[2],B0[3],B1[1],B1[2],B2[2],B1[3]]),
 ('roar',[R0[2],R0[3],R0[4],R1[1],R1[2],R1[3],R1[4],R2[5]]),
 ('shell',[S0[1],S0[2],S0[3],S1[0]]),
 ('shield',[S1[1],S1[2],S1[3],S1[2]]),
 ('emerge',[S2[0],S2[1],S2[2]]),
]
# dáng đi mới (walk.png: 2 hàng x 3 khung, nền trong suốt, quay phải)
WALK=Image.open('walk.png').convert('RGBA')
K_WALK=0.6
def khung_di(box):
    im=WALK.crop(box); im=im.crop(im.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox())
    return im.resize((round(im.width*K_WALK),round(im.height*K_WALK)),Image.LANCZOS)
DI=[khung_di((x0,y0,x1,y1)) for (y0,y1) in [(0,450),(450,896)] for (x0,x1) in [(0,400),(400,800),(800,1199)]]
frames=[];anims={};i=0
for name,lst in ANIM:
    anims[name]=[i,len(lst)]
    for sheet,box in lst:
        sc=K_B2 if (sheet=='bite' and box[1]==515) else (1.28 if sheet=='roar' else 1.0)
        frames.append(frame(sheet,box,scale=sc)); i+=1
anims['walk']=[i,len(DI)]
for f in DI: frames.append(f); i+=1
K=0.56
FW=330; FH=260; AX=160; AY=252
strip=Image.new('RGBA',(round(FW*K)*len(frames),round(FH*K)))
fw,fh=round(FW*K),round(FH*K)
for j,f in enumerate(frames):
    c=Image.new('RGBA',(FW,FH)); cx=cx_body(f)
    x=int(AX-cx); y=AY-f.height
    c.alpha_composite(f,(max(0,min(FW-f.width,x)),max(0,y)) if f.width<=FW else (0,max(0,y)))
    strip.alpha_composite(c.resize((fw,fh),Image.LANCZOS),(j*fw,0))
strip.save('long_quy.png',optimize=True)
print(json.dumps(dict(fw=fw,fh=fh,ax=round(AX*K),ay=round(AY*K),n=len(frames),anims=anims,sizes=[f.size for f in frames])))
# vòng sóng âm riêng
ring=SH['roar'].crop((888,592,1020,730)); ring=ring.crop(ring.getbbox()); ring.save('long_quy_song.png')
print('ring',ring.size)
