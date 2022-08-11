/* Object handling the pictures of the gallery 
and the dropdown menu to filter the pictures based on the selection of the user */
let filterPictures = {
  selectBtn : document.querySelector("#filter-select"),
  selectBtnText : document.querySelector("#filter-select span"),
  filterWrapper : document.querySelector("#filter-wrapper"),
  galleryWrapper : document.querySelector("#gallery"),
  filterBtn : Array.from(document.querySelectorAll(".filter")),
  pictures : Array.from(document.querySelectorAll(".gallery-item")),

  /* Init function, to handle the clicks to toggle the dropdown menu
  and filter the pictures based on the selection by the user */
  init: function() {
    var self = this;

    // Handle the click to toggle the dropdown menu
    self.selectBtn.addEventListener("click", self.toggleFilterListDisplayed);

    // Handle the click to filter the pictures based on the selection
    self.filterBtn.forEach(function(elem) {
      elem.addEventListener("click", self.filterPicturesByCategory);
    });
  },

  // Toggle the dropdown menu
  toggleFilterListDisplayed : function() {
    var self = filterPictures;

    self.filterWrapper.classList.toggle("close");
    self.galleryWrapper.classList.toggle("blur");

    self.selectBtn.setAttribute(
      'aria-expanded', 
      self.selectBtn.getAttribute('aria-expanded') === 'true' 
        ? 'false' 
        : 'true'
    );
  },

  // Filter the pictures of the gallery based on the selection
  filterPicturesByCategory : function(e) {
    var self = filterPictures;
    const clickedBtn = e.target.dataset.filter;
    const textClickedBtn = e.target.innerHTML;

    for (const currentPicture of self.pictures) {
      if (currentPicture.dataset.category === clickedBtn) {
        currentPicture.classList.remove("hidden");
        continue;
      }   
      currentPicture.classList.add("hidden");
    }

    self.toggleFilterListDisplayed();
    self.changeTextFilter(textClickedBtn);
  },

  // Change the text of the filter to show the current selection to the user
  changeTextFilter : function(newText) {
    var self = this;

    self.selectBtn.classList.add('selected');
    self.selectBtnText.innerHTML = newText;
    
    // We show the button to reset the selection of the user
    self.resetBtn.classList.remove('hidden');
  }


}
filterPictures.init();