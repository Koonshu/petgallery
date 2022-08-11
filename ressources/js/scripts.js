/* Object handling the pictures of the gallery 
and the dropdown menu to filter the pictures based on the selection */
let filterPictures = {
  selectBtn : document.querySelector("#filter-select"),
  selectBtnText : document.querySelector("#filter-select span"),
  filterWrapper : document.querySelector("#filter-wrapper"),
  galleryWrapper : document.querySelector("#gallery"),
  filterBtn : Array.from(document.querySelectorAll(".filter")),
  pictures : Array.from(document.querySelectorAll(".gallery-item")),
  resetBtn : document.querySelector("#reset-btn"),

  /* Init function, to handle the clicks to toggle the dropdown menu
  and filter the pictures based on the selection */
  init: function() {
    var self = this;

    // Randomize the order of the pictures
    self.randomizeOrderPictures();

    // Handle the click to toggle the dropdown menu
    self.selectBtn.addEventListener("click", self.toggleFilterListDisplayed);

    // Handle the click to filter the pictures based on the selection
    self.filterBtn.forEach(function(elem) {
      elem.addEventListener("click", self.filterPicturesByCategory);
    });
  },

  /* Just for the example, this function randomize the position of each pictures
  to have like a new page every time we refresh the page */
  randomizeOrderPictures : function() {
    var self = this;

    for (var i = self.galleryWrapper.children.length; i >= 0; i--) {
      self.galleryWrapper.appendChild(self.galleryWrapper.children[Math.random() * i | 0]);
    }
  },

  // Toggle the dropdown menu
  toggleFilterListDisplayed : function() {
    var self = filterPictures;

    self.filterWrapper.classList.toggle("close");
    self.galleryWrapper.classList.toggle("blur");

    // Toggle the aria-expanded of the dropdown menu, for accessibility
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
      } else if( clickedBtn === "reset"){
        currentPicture.classList.remove("hidden");
        continue;
      }     
      currentPicture.classList.add("hidden");
    }

    if(clickedBtn !== "reset") {
      self.toggleFilterListDisplayed();
      self.changeTextFilter(textClickedBtn);
    } else {
      self.resetTextFilter();
    }
  },

  // Change the text of the filter to show the current selection
  changeTextFilter : function(newText) {
    var self = this;

    self.selectBtn.classList.add('selected');
    self.selectBtnText.innerHTML = newText;
    
    // We show the button to reset the selection
    self.resetBtn.classList.remove('hidden');
  },

  resetTextFilter : function() {
    var self = this;

    self.selectBtn.classList.remove('selected');
    self.selectBtnText.innerHTML = self.selectBtnText.dataset.text;

    // We hide the button to reset the selection
    self.resetBtn.classList.add('hidden');
  },


}
filterPictures.init();