const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
// search states.json and filter it 
const searchStates= async searchText  => {
    const res = await fetch('../fetchdata/data.json');
    const states = await res.json();
    // get matches to current text input
    // ^ in front means start with whatever you type in the search bar
    //'gi' means it will march whatever you type is uppercase or lowercase
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`,'gi');
        return state.name.match(regex)||state.abbr.match(regex);
        });
    if( searchText.length===0 ){
        matches=[];
        matchList.innerHTML='';
    }
    outHtml(matches);
    
}
// show output and join('') will turn this into a actual string and
//without join method it will return an array of html string.

const outHtml = matches =>{
    if(matches.length>0){
        const html = matches.map(match => `
           <div class="card card-body mb-1">
              <h4>${match.name}|${match.abbr} <span 
              class='text-danger'>${match.capital}</span></h4>
              <small>Lat: ${match.lat} | Long: ${match.long}</small>
           </div>
        `) .join('');
        matchList.innerHTML = html;
        
    }
}

// const outHtml = matches =>{
//     if(matches.length>0){
//         const html = matches.map(match =>{
//          return(
//            <div class="card card-body mb-1">
//               <h4>`${match.name}|${match.abbr}` <span class='text-danger'>`${match.capital}`</span></h4>
//               <small>Lat: `${match.lat}` | `Long: ${match.long}`</small>
//            </div>)}
//         ) 
//         matchList.innerHTML = html;
        
//     }
// }




search.addEventListener('input', () => searchStates(search.value))