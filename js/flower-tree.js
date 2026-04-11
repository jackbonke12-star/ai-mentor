// Main controller — manages hub vs petal view, swipe, zoom toggle
var FlowerTree = {
  currentPetal: -1, // -1 = hub view
  isZoomedOut: false,
  touchStartX: 0,
  touchEndX: 0,

  // Initialize the flower tree into a container
  init: function(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    // Determine starting view
    var recommended = getRecommendedPetals();
    if (recommended.length > 1) {
      // Start on the first recommended non-foundation petal
      for (var i = 0; i < FLOWER_PETALS.length; i++) {
        if (recommended.indexOf(FLOWER_PETALS[i].id) > -1 && FLOWER_PETALS[i].id !== 'foundation') {
          this.currentPetal = i;
          break;
        }
      }
    }
    if (this.currentPetal === -1) this.currentPetal = 0; // default to foundation

    this.renderCurrentView(container);
    this.attachSwipe(container);
  },

  renderCurrentView: function(container) {
    if (!container) container = document.getElementById('flower-tree-container');
    if (!container) return;

    if (this.isZoomedOut || this.currentPetal === -1) {
      FlowerHub.render(container);
    } else {
      FlowerPetalView.render(container, this.currentPetal);
    }
  },

  showHub: function() {
    this.isZoomedOut = true;
    var container = document.getElementById('flower-tree-container');
    if (container) {
      container.classList.add('ft-transition-out');
      var self = this;
      setTimeout(function() {
        FlowerHub.render(container);
        container.classList.remove('ft-transition-out');
        container.classList.add('ft-transition-in');
        setTimeout(function() { container.classList.remove('ft-transition-in'); }, 300);
      }, 150);
    }
  },

  openPetal: function(index) {
    this.currentPetal = index;
    this.isZoomedOut = false;
    var container = document.getElementById('flower-tree-container');
    if (container) {
      container.classList.add('ft-transition-out');
      var self = this;
      setTimeout(function() {
        FlowerPetalView.render(container, self.currentPetal);
        container.classList.remove('ft-transition-out');
        container.classList.add('ft-transition-in');
        setTimeout(function() { container.classList.remove('ft-transition-in'); }, 300);
      }, 150);
    }
  },

  toggleZoom: function() {
    if (this.isZoomedOut) {
      this.isZoomedOut = false;
      this.renderCurrentView();
    } else {
      this.showHub();
    }
  },

  // Swipe between petals
  attachSwipe: function(container) {
    var self = this;
    container.addEventListener('touchstart', function(e) {
      self.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', function(e) {
      self.touchEndX = e.changedTouches[0].screenX;
      var diff = self.touchStartX - self.touchEndX;
      if (Math.abs(diff) < 50) return; // not a swipe
      if (self.isZoomedOut) return; // no swipe on hub

      if (diff > 0) {
        // Swipe left — next petal
        self.nextPetal();
      } else {
        // Swipe right — prev petal
        self.prevPetal();
      }
    }, { passive: true });
  },

  nextPetal: function() {
    if (this.currentPetal < FLOWER_PETALS.length - 1) {
      this.openPetal(this.currentPetal + 1);
    }
  },

  prevPetal: function() {
    if (this.currentPetal > 0) {
      this.openPetal(this.currentPetal - 1);
    }
  }
};