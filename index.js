var datas={list:[],type:'',index:0,title:null,changeDisp:'none',ingre:[],direction:[],datum:[{title:'Lighter Chicken Parmesan',ingr:"One 24-ounce jar good-quality marinara sauce  1 tablespoon balsamic vinegar  1/2 cup panko breadcrumbs  1/2 cup grated Parmesan  1/4 cup finely chopped fresh flat-leaf parsley  Kosher salt and freshly ground black pepper  2 large egg whites, lightly beaten  1 1/2 pounds chicken tenders  12 ounces whole-wheat angel hair pasta  1 tablespoon olive oil  1/2 cup shredded fresh mozzarella".split('  '),directions:"Preheat the broiler to medium. Bring a large pot of water to a boil.  Combine the marinara sauce and balsamic vinegar in a small saucepan and bring to a boil over high heat. Reduce the heat and simmer for 5 minutes.  Meanwhile, in a shallow dish, combine the breadcrumbs, half the Parmesan, half the parsley and some salt and pepper. Put the beaten egg whites in a separate shallow dish. Coat the chicken tenders in the egg whites first, then dredge in the breadcrumb mixture.  Add the pasta to the boiling water and cook according to the package instructions.  Heat the oil in a large ovenproof nonstick skillet over medium-high heat. Add the chicken and cook, turning once, until golden, about 3 minutes per side. Pour the tomato sauce over the chicken, scatter the mozzarella and remaining Parmesan evenly over top and broil until the cheese is melted and bubbly, about 2 minutes.  Drain the pasta. Serve with the chicken and garnish with the remaining parsley.".split('  ')},{title:'White Rice',ingr:['Clean water','Rice','salt'],directions:['Boil 15ml of water','Wash 15g of rice into the water and add salt to taste','Steam for about 15-20mins','Ready to Eat']},{title:'Sweet and Sour Glazed Shrimp',ingr:"1/4 cup Chinese plum sauce  1/4 cup ketchup  2 teaspoons soy sauce  1/4 teaspoon crushed red pepper flakes  1 1/4 pounds medium shrimp, peeled and deveined and tails removed  Kosher salt and freshly ground black pepper  1 tablespoon peanut oil  2 scallions, thinly sliced (white and green parts kept separate)  1 clove garlic, finely chopped  1 teaspoon finely chopped peeled fresh ginger  3 tablespoons unseasoned rice wine vinegar  Cooked white rice, for serving, optional".split('  '),directions:"Stir together the plum sauce, ketchup, soy sauce and pepper flakes in a small bowl and set aside.  Sprinkle the shrimp with salt and pepper. Heat the oil in a medium skillet over medium-high heat. Add the shrimp to the skillet and cook, stirring occasionally, until just cooked through, 2 to 3 minutes. Transfer to a plate.  Add the scallion whites, garlic and ginger to the skillet and cook, stirring constantly, until soft, about 1 minute. Add the vinegar and scrape up any brown bits that cling to the bottom of the skillet. Add the plum-ketchup sauce and bring to a simmer. Return the shrimp to the skillet along with the scallion greens and give the skillet a swirl to bring everything together. Divide among 4 plates and serve with white rice if using.".split('  ')},{title:'Bacon and Egg Spaghetti',ingr:"Kosher salt  1 pound spaghetti  1 tablespoon extra-virgin olive oil  6 slices thick-cut bacon, chopped  1/3 cup grated parmesan cheese  Freshly ground pepper  6 large eggs  Finely chopped fresh chives, for topping".split('  '),directions:"Bring a large pot of salted water to a boil. Add the pasta and cook as the label directs. Drain, reserving 1 cup of the cooking water.  Meanwhile, heat the olive oil in a separate large pot over medium-high heat. Add the bacon and cook until crisp, 7 to 9 minutes.  Add the pasta, 1/2 cup reserved cooking water and the parmesan to the pot with the bacon. Cook, stirring and adding more cooking water as needed, until coated; season with salt and pepper.   Meanwhile, heat the remaining 2 teaspoons olive oil in a large nonstick skillet over medium heat. Add the eggs and cook until the whites are set but the yolks are still runny, about 4 minutes; season with salt and pepper. Top the pasta with the eggs and chives.".split('  ')}]}

var data =typeof localStorage["_recipes1119"] != "undefined"? JSON.parse(localStorage.getItem("_recipes1119")) :datas
console.log(typeof localStorage['_recipes1119'])
var text,ing,dire
var ind=0
Vue.component('todo-item', {
  props: ['todo'],
  template: "<li class='ul' :style='{color:color, backgroundColor:back}' :id='todo' @click='change'>{{ todo }}</li>",
  data(){
      ind+=1
      let colors=ind%2==0?{backgroundColor:'#fff',color:'#084C61'}:{backgroundColor:'#084C61',color:'#ff5722'}
      return {color:colors.color,back:colors.backgroundColor}
  },
  methods:{
      change:function(e){
            data.index=data.list.findIndex(i=>i==e.target.id)
            data.ingre=data.datum[data.index].ingr
            data.direction=data.datum[data.index].directions
            data.title=data.datum[data.index].title
        }
  }
})
Vue.component('ingredient',{
    props:['ing'],
    template:"<li>{{ ing }}</li>"
})
Vue.component('direct', {
  props: ['dir'],
  template: "<li>{{ dir }}</li>"
})
new Vue({ 
    el: '#app',
    data: data,
    created:function(){
        let list=[]
        data.datum.map(i=>{
            list.push(i.title)
        })
        data.list=list
        data.ingre=data.datum[data.index].ingr
        data.direction=data.datum[data.index].directions
        data.title=data.datum[data.index].title
    },
    methods:{
        deleter:function(){
            if(data.list.length>1){
                data.datum.splice(data.index,1)
                data.index=data.index>0?data.index-1:data.index+1
                data.ingre=data.datum[data.index].ingr
                data.direction=data.datum[data.index].directions
                data.title=data.datum[data.index].title
                let list=[]
                data.datum.map(i=>{
                    list.push(i.title)
                })
                data.list=list   
            }
            else{
                data.ingre=[]
                data.direction=[]
                data.title=''
                data.list=[]
                data.datum[data.index]=[{title:'',directions:[],ingr:[]}]
            }
            localStorage.setItem('_recipes1119', JSON.stringify(data));
        },
        
        edit:function(){
            data.type='edit'
            data.changeDisp='block'
            this.text=data.datum[data.index]['title']
            this.ing=data.datum[data.index]['ingr'].join('\n')
            this.dire=data.datum[data.index]['directions'].join('\n')
            
        },
        newer:function(){
          data.type='new'
          data.changeDisp='block'
          this.text=''
          this.ing=''
          this.dire=''
        },
        done:function(e){
            text=document.querySelector('.input').value
            ing=document.querySelector('.textarea1').value
            dire=document.querySelector('.textarea2').value
            //console.log(text)
            if(data.type=='new'){
                data.datum=data.datum.concat({title:text,ingr:ing.split(/[\n\\]/),directions:dire.split(/[\n\\]/)})
                data.index=data.datum.length-1
                data.title=text
                data.ingre=data.datum[data.index].ingr
                data.direction=data.datum[data.index].directions
                let list=[]
                data.datum.map(i=>{
                list.push(i.title)
                })
                data.list=list
            }
            else if(data.type='edit'){
                data.datum[data.index]['title']=text
                //console.log(ing)
                data.datum[data.index]['ingr']=ing.split(/[\n\\]/)
                data.datum[data.index]['directions']=dire.split(/[\n\\]/)
                data.title=text
                data.ingre=data.datum[data.index].ingr
                data.direction=data.datum[data.index].directions
                let list=[]
                data.datum.map(i=>{
                list.push(i.title)
                })
                data.list=list
            }
            data.changeDisp='none'
            localStorage.setItem('_recipes1119', JSON.stringify(data));
        },
        cancel:function(){
            data.changeDisp='none'
            localStorage.setItem('_recipes1119', JSON.stringify(data));
        }
    }
});

