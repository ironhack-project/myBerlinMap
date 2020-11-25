function searchList() {
  let input, filter, ul, li, name, i, txtValue;

  input = document.getElementById("userSearch");
  filter = input.value.toUpperCase();
  ul = document.getElementById("restaurantList");
  li = ul.getElementsByTagName("li");

  for (i = 0; i <150 ; i++) {
      name = li[i].getElementsByTagName("a")[0];
      console.log(name)
      txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
 };
