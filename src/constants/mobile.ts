const  mobile = {
    MOBILE: function() {
      return navigator.userAgent.match(/Android|iPhone|Opera Mini|iPad/i) ;
    },
    DESKTOP: function() {
      return navigator.userAgent.match(/IEMobile/i);
    },
}

const typesMobile = {
    MOBILE : "MOBILE",
    DESKTOP : "DESKTOP"
}


const isMobile = () => {
    if(navigator !=undefined){

        return mobile.MOBILE() ? typesMobile.MOBILE : typesMobile.DESKTOP;
    }
    return typesMobile.MOBILE  ;
}

export {
    isMobile,
    mobile,
    typesMobile
}
