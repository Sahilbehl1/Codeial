// window.scrollTo(0,2000); ab ye mein go live karunga to mein 2000px neeche hi hunga
//window.scrollBy(0,100)  ye 100px neeche laate rhega agar console mein run karoge scroll by is giving kitna steps scroll karna hain and scroll to is specifying the location ki udhar rukjao 

// to perform the task repeatedly we use setInterval
// neeche vaale se code tum dheere dheere neeche to aajaoge but vapas upar nhi ja paonge as set inteval apna function baar baar call karta hain ek solution hain ki sabse last mein clearInteval(scrollInterval) likhdo isse ek baar neeche aagye then upar and neeche kahi bhi jaa sakte ho but merko ye bhi nhoi chaiye merko chaiye ki user koi bhi section click karengato vo neeche dheere dheere aae and us section par ruk jae then vapas se koi section to same procedure ho
// var scrollInterval = setInterval(function(){
//     window.scrollBy(0,50);
// },200);

// isse mein ek baar udhar aajaunga but abhi to mene 1000 set kara hain merko kuch aisa karna hain ki vo section ke end par ruk jae
// var targetpos = 1000;
// var currentpos = 0;
// var scrollInterval = setInterval(function(){
//     if(currentpos>=targetpos){
//         clearInterval(scrollInterval);
//     }
//     currentpos+=50;
//     window.scrollBy(0,50);
// },50);

var navmenuanchortags = document.querySelectorAll('.list a');
// var interval;
for(var i = 0;i<navmenuanchortags.length;i++){
    navmenuanchortags[i].addEventListener('click',function(event){
        event.preventDefault();
//          // isse mene uska default behaviour hi hata diya as phele usko click karne par mein us section mein direct phunch jaata tha
        var targetsectionId = this.textContent.trim().toLowerCase();
//         // jo click hoga mein target section mein le lunga and lower case isliye kara kyoki meri ids in html lower case mein thi and trim is to remove spaces
        var targetsection = document.getElementById(targetsectionId);
        console.log(targetsection);

    // interval = setInterval(scrollVertically,50,targetsection);
    //       // or we can do 
    // interval = setInterval(function(){
    //     scrollVertically(targetsection);
    // },20)

//         // FIRST METHOD IS THIS SECOND METHOD IS TO MAKE FUNCTION OUTSIDE THAT IS scrollVertically but hum iske variables like target section bahar acess nhi kar sakte to merko iske liye target section ko function mein pass karna padega in var interval vaala and isko fir merko global bnana padega
        var interval = setInterval(function(){
            var targetsectioncoordinates = targetsection.getBoundingClientRect();
            if(targetsectioncoordinates.top <= 0){ // jab mein neeche aate rhuga to upar se distance chota hote rhega and jab 0 hoga to mein stopr kardunga
                clearInterval(interval);
                return;
            }
            window.scrollBy(0,50);
        },40);
    }); 
}
// function scrollVertically(targetsection){
//     var targetsectioncoordinates = targetsection.getBoundingClientRect();
//             if(targetsectioncoordinates.top <= 0){ 
//                 clearInterval(interval);
//                 return;
//             }
//             window.scrollBy(0,50);
// }

var progressbarone = document.querySelectorAll('.skillprogress > div');;
var progressbartwo = document.querySelectorAll('.skillprogress > div');;
var skillsContainer = document.getElementById('skills-container');
window.addEventListener('scroll',checkscroll);
var animationdone = false;

function initializebars(){
    for(let bar of progressbarone){
        bar.style.width = 0 + '%';
    }
}
initializebars();
function fillbars(){
    for(let bar of progressbarone){
        let target = bar.getAttribute('data-bar-width');
        let currentwidth = 0;
        let interval = setInterval(function(){
            if(currentwidth > target){
                clearInterval(interval);
                return;
            }
            currentwidth++;
            bar.style.width = currentwidth + '%';
        },60);
    }
}
fillbars();
function initializebarstwo(){
    for(let bar of progressbartwo){
        bar.style.width = 0 + '%';
    }
}
initializebarstwo();
function fillbarstwo(){
    for(let bar of progressbartwo){
        let target = bar.getAttribute('data-bar-width');
        let currentwidth = 0;
        let interval = setInterval(function(){
            if(currentwidth > target){
                clearInterval(interval);
                return;
            }
            currentwidth++;
            bar.style.width = currentwidth + '%';
        },60);
    }
}
fillbarstwo();

function checkscroll(){
    // check whether skill container is currently visible on the screen
    var coordinates = skillsContainer.getBoundingClientRect();
    if(!animationdone && coordinates.top < window.innerHeight){
        animationdone = true; // i am doing this because jab bhi mein thoda sa scroll karunga vo fluctuating bar baar baar merko aage piche hote rhega merko to ek hi baar 0 se uski %age tak laana hain
        console.log('skills section visible')
    }
    else if(coordinates.top > window.innerHeight){
        animationdone = false;
        initializebars();
        fillbars();
    }
}
