class confetti {
  constructor() {
    this.colors = [color(137, 198, 220), color(241, 146, 88), color(240, 240, 88)]
    this.shapes = ['rect', 'circ']
    this.height = random(20, 40)
    this.width = random(10, 20)
    this.mass = map(this.width * this.height, 200, 800, 0, 1)
    this.color = this.colors[Math.floor(Math.random()*this.colors.length)]
    this.shape = this.shapes[Math.floor(Math.random()*this.shapes.length)]
  }

  randomise() {
    let x
    if (random() > 0.5) {
      x = 0
      this.force = createVector(random(50), random(20, 50))
      this.vel = createVector(random(700, 1000), random(1, 5))
    } else {
      x = windowWidth
      this.force = createVector(random(-50), random(20, 50))
      this.vel = createVector(random(-1000, -700), random(1, 5))
    }
    let y = 0 - this.height
    this.pos = createVector(x, y)
    this.acc = createVector()
  }

  applyForce() {
    let f = this.force.mult(this.mass)
    this.acc.add(f)
  }

  update() {
    this.vel.limit(this.mass * 10)
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  render() {
    fill(this.color)
    noStroke()
    if (this.shape === 'rect') {
      rect(this.pos.x, this.pos.y, this.width, this.height)
    } else {
      ellipse(this.pos.x, this.pos.y, this.width)
    }
  }
}

let confetty = []

function setup() {
  createCanvas(windowWidth, windowHeight)
  let amount
  if (windowWidth < 600) {
    amount = 400
  } else {
    amount = 1000
  }
  for (let i = 0; i < amount; i++) {
    confetty.push(new confetti)
    confetty[i].randomise()
  }
  print(confetty.length)
}

function draw() {
  clear()

  for (i of confetty) {
    i.render()
    i.applyForce()
    i.update()
    if (i.pos.y > windowHeight + 40 || i.pos.x < -200 || i.pos.x > windowWidth + 200) {
      i.randomise()
    }
  }
}









function generatetile() {
  colors = ['blue', 'l-blue', 'green', 'd-green', 'red', 'purple']
  color = colors[Math.floor(Math.random()*colors.length)];
  //console.log(color)
  return element = '<div class="tile animated flipInX ' + color + '"></div>'
}

function addTile() {
  let bg = $(".bg")
  let tile = generatetile()
  return bg.append(tile)
}

$(document).ready(function(){
  for (let i = 0; i < 42; i++) {
    addTile()
  }
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 500, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      })
    } // End if
  })

  $(window).scroll(function() {
    let scroll = $(this).scrollTop(),
        height = $(this).height()
    let opac = (1 -(scroll % (height * 2)) / height)

    $(".bg").css({
      opacity: "" + opac + "",
      //transform: "translateY(" + scroll + "px)"
    })
    $(".p5Canvas").css({
      opacity: "" + scroll % (height * 2) / height + ""
    })
      
    if (scroll <= height / 2) {
      $(".hero-text").css({
        display: "block",
        transform: "translateY(-" + scroll / 2 + "px)"
      })
    } else if (scroll > height / 2) {
      $(".hero-text").css({
        display: "none"
      })
    }
  })
})