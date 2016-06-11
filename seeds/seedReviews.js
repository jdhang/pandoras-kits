'use strict'

const Promise = require('sequelize').Primise
const Review = require('../server/db').model('review')

module.exports = function () {

  let reviews = [
    {
      title: 'Well, the way they make shows is, they make one show.',
      num_stars: 4,
      content: 'Cheese triangles cheese and wine paneer. Queso cauliflower cheese croque monsieur chalk and cheese everyone loves red leicester say cheese paneer. Parmesan cheesecake croque monsieur cheese on toast port-salut pecorino cottage cheese cheddar. Halloumi halloumi red leicester jarlsberg airedale cottage cheese.'
    },
    {
      title: 'That show\'s called a pilot.',
      num_stars: 3,
      content: 'Lancashire macaroni cheese ricotta. Cauliflower cheese chalk and cheese fondue edam smelly cheese hard cheese pepper jack gouda. Macaroni cheese bocconcini lancashire manchego babybel rubber cheese cheesy grin goat. Stilton squirty cheese say cheese danish fontina squirty cheese pecorino cheesecake feta. Goat cheese on toast halloumi.'
    },
    {
      title: 'Some pilots get picked and become television programs.',
      num_stars: 3,
      content: 'Cheesy feet caerphilly cut the cheese. Stinking bishop lancashire bavarian bergkase cream cheese goat roquefort cheeseburger queso. Cow danish fontina squirty cheese melted cheese emmental babybel chalk and cheese blue castello. Ricotta cheesy grin parmesan the big cheese cheddar everyone loves cheese strings roquefort. Rubber cheese.'
    },
    {
      title: 'Some don\'t, become nothing. She starred in one of the ones that became nothing.',
      num_stars: 2,
      content: 'Cheesy grin st. agur blue cheese rubber cheese. Cheesecake chalk and cheese squirty cheese caerphilly cut the cheese the big cheese mozzarella brie. Mascarpone stinking bishop monterey jack taleggio when the cheese comes out everybody\'s happy cheesy grin taleggio edam. Cheesecake queso monterey jack cow cow queso.'
    },
    {
      title: 'Proin suscipit luctus orci placerat fringilla.',
      num_stars: 5,
      content: 'St. agur blue cheese when the cheese comes out everybody\'s happy everyone loves. Cheesecake feta lancashire cheese triangles cow cheesy grin hard cheese rubber cheese. Cream cheese mascarpone jarlsberg cheesy feet cow chalk and cheese cow chalk and cheese. Cow everyone loves manchego paneer.'
    },
    {
      title: 'Donec hendrerit laoreet risus eget adipiscing.',
      num_stars: 5,
      content: 'Cheese triangles cheese and wine paneer. Queso cauliflower cheese croque monsieur chalk and cheese everyone loves red leicester say cheese paneer. Parmesan cheesecake croque monsieur cheese on toast port-salut pecorino cottage cheese cheddar. Halloumi halloumi red leicester jarlsberg airedale cottage cheese.'
    },
    {
      title: 'Suspendisse in urna ligula, a volutpat mauris.',
      num_stars: 4,
      content: 'Lancashire macaroni cheese ricotta. Cauliflower cheese chalk and cheese fondue edam smelly cheese hard cheese pepper jack gouda. Macaroni cheese bocconcini lancashire manchego babybel rubber cheese cheesy grin goat. Stilton squirty cheese say cheese danish fontina squirty cheese pecorino cheesecake feta. Goat cheese on toast halloumi.'
    },
    {
      title: 'Sed enim mi, bibendum eu pulvinar vel, sodales vitae dui.',
      num_stars: 1,
      content: 'Cheesy feet caerphilly cut the cheese. Stinking bishop lancashire bavarian bergkase cream cheese goat roquefort cheeseburger queso. Cow danish fontina squirty cheese melted cheese emmental babybel chalk and cheese blue castello. Ricotta cheesy grin parmesan the big cheese cheddar everyone loves cheese strings roquefort. Rubber cheese.'
    },
    {
      title: 'Proin bibendum ullamcorper rutrum.',
      num_stars: 4,
      content: 'Cheesy grin st. agur blue cheese rubber cheese. Cheesecake chalk and cheese squirty cheese caerphilly cut the cheese the big cheese mozzarella brie. Mascarpone stinking bishop monterey jack taleggio when the cheese comes out everybody\'s happy cheesy grin taleggio edam. Cheesecake queso monterey jack cow cow queso.'
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      num_stars: 3,
      content: 'St. agur blue cheese when the cheese comes out everybody\'s happy everyone loves. Cheesecake feta lancashire cheese triangles cow cheesy grin hard cheese rubber cheese. Cream cheese mascarpone jarlsberg cheesy feet cow chalk and cheese cow chalk and cheese. Cow everyone loves manchego paneer.'
    }
  ]

  let creatingReviews = reviews.map((reviewObj) => {
    return Review.create(reviewObj)
  })

  return Promise.all(creatingReviews)

}

