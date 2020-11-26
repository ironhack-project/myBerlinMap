
function searchList() {
  let input, filter, ul, li, name, i, txtValue;

  input = document.getElementById("userSearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("restaurantList");
    li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
      name = li[i].getElementsByTagName("b")[0];
      
      if(!name) {
          continue;
      }
      
      text = name.innerText.toString();

      //console.log(text)
      if (text.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}