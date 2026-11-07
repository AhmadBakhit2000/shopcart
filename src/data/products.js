// Catalogue built from the design video. `img` files live in /public/img
export const COLORS = { Pink:'#e8394d', Black:'#3a3a3a', Green:'#a9d3b8', White:'#d9d9d9', Blue:'#2f4f7a' }
const img = n => `/img/${n}.jpg`
// Colour variants of AirPods Max (main image + thumbnail)
export const AIRPODS_VARIANTS = { Pink:img('am_pink'), Black:img('am_gray'), Green:img('am_green'), Blue:img('am_blue'), White:img('am_silver') }
export const AIRPODS_THUMBS = ['th0','th1','th2','th3'].map(img)

const P = (id,name,price,desc,type,material,colors,i,rating=5,offer=false) => ({ id,name,price,desc,type,material,colors,img:img(i),rating,reviews:121,offer })
// Order here = order on the home page grid (3 rows of 4)
export const products = [
 P(0,'Wireless Earbuds, IPX8',89,'Organic Cotton, fairtrade certified','In-ear','Plastic',['Black'],'p0'),
 { ...P(1,'AirPods Max',559,'A perfect balance of high-fidelity audio','Over-ear','Metal',['Pink','Black','Green','White','Blue'],'p1'), airpods:true },
 P(2,'Bose BT Earphones',289,'Table with air purifier, stained veneer/black','Over-ear','Plastic',['Black'],'p2',4.5),
 P(3,'VIVEFOX Headphones',39,'Wired Stereo Headsets With Mic','On-ear','Plastic',['Pink'],'p3',5,true),
 P(8,'JBL TUNE 600BTNC',59,'Premium Bone Conduction Open Ear Bluetooth','On-ear','Plastic',['Black'],'p8',5,true),
 P(9,'TAGRY Bluetooth',109,'256, 8 core GPU, 8 GB','In-ear','Plastic',['Black'],'p9'),
 P(10,'Monster MNFLEX',89.75,'Flex Active Noise Canceling Bluetooth','In-ear','Plastic',['Black'],'p10'),
 P(11,'Mpow CH6',569,'Kids Headphones','Over-ear','Plastic',['Blue'],'p11',4.5),
 P(4,'TaoTronics Earbuds',59,'Organic Cotton, fairtrade certified','In-ear','Plastic',['Black'],'p4',5,true),
 P(5,'SoundPEATS APTX',99,'Active Noise Canceling Bluetooth Headphones','In-ear','Metal',['Black'],'p5'),
 P(6,'Beats Solo3',199.95,'Beats Solo3 Wireless Headphones - Rose Gold','On-ear','Metal',['Pink'],'p6'),
 P(7,'Jelly Comb Bluetooth',569,'Headphones with RGB Light, Stereo','Over-ear','Plastic',['Black'],'p7'),
]
// "Weekly Popular Products" row on the home page
export const weekly = [
 { id:100, name:'Gaming Headphone', price:239, desc:'Table with air purifier, stained veneer/black', img:img('w0') },
 { id:101, name:'Macbook pro 13"', price:1099, desc:'256, 8 core GPU, 8 GB', img:img('w1') },
 { id:102, name:'HomePod mini', price:59, desc:'5 Colors Available', img:img('w2') },
 { id:103, name:'Laptop sleeve MacBook', price:59, desc:'Organic Cotton, fairtrade certified', img:img('w3') },
].map(p => ({ ...p, type:'Over-ear', material:'Plastic', colors:['Black'], rating:5, reviews:121 }))
export const allProducts = [...products, ...weekly]

// Spec tables on the product page (General / Product details)
export const specs = {
  general: [['Brand','Apple'],['Model','Model AirPods Max Wireless Headphones'],['Price','$549.00'],['Release date','December 2020'],['Model Number','AirPods Max'],['Headphone Type','Over-Ear'],['Connectivity','Wireless']],
  details: [['Microphone','Yes'],['Driver Type','Dynamic'],['Driver Size (mm)','40'],['Number of Drivers','1'],['Water Resistant','No'],['Weight (g)','385.00'],['Battery Life (Hrs)','20']],
}
// Popular categories dropdown
export const popularCats = [['furniture','Furniture'],['headphone','Headphone'],['shoe','Shoe'],['bag','Bag'],['laptop','Laptop'],['book','Book']]
export const fmt = n => { const [a,b] = n.toFixed(2).split('.'); return [a,b] }
