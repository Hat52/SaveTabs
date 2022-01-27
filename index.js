let myleads = []

const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))
if (leadsFromLocalStorage) {
    myleads = leadsFromLocalStorage
    render(myleads)
}
tabBtn.addEventListener("click", function() {
    //chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {});
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myleads.push(tabs[0])
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)
    })

})

function deleteItem(index){
    console.log(index)
}
function render(leads) {
    let listItems = ulEl.innerHTML
    while (ulEl.hasChildNodes()) {
        ulEl.removeChild(ulEl.firstChild);
       }
    listItems = ""
    for (let i = 0; i < leads.length; i++) {
      var li = document.createElement("li");
      var b =document.createElement("b")
      var b_value = document.createTextNode(i+1)
      b.appendChild(b_value)
      var anchorTag = document.createElement("a")
      anchorTag.setAttribute("href",leads[i])
      anchorTag.target = "_blank"
      anchorTag.innerHTML =leads[i]
      var button = document.createElement("button")
      button.onclick = ()=>deleteItem(i)
      var i_tag = document.createElement("i")
      i_tag.classList.add("fa")
      i_tag.classList.add("fa-trash")
      button.appendChild(i_tag)
      button.classList.add("btn")
      const hr = document.createElement("hr")
      li.appendChild(b)
      li.appendChild(anchorTag)
      li.appendChild(button)
      li.appendChild(hr)

        // listItems += `
        // <li onclick="deleteItem()">
        //     <b>${i+1}-</b>
        //     <a target= '_blank' href= '${leads[i]}' >
        //     ${leads[i]}
        //     </a>
            
        //     <button class="btn" id='btn${i}' onclick="deleteItem(i)"><i class="fa fa-trash" ></i></button>
        //     <hr/>
            
        // </li>
        // `
        ulEl.appendChild(li)
    }
    // ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myleads = []
    render(myleads)
})

inputBtn.addEventListener("click", function() {
    if(!inputEl.value){
        return
    }
    myleads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myleads", JSON.stringify(myleads))
    render(myleads)
})