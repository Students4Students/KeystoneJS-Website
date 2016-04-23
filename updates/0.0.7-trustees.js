/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 * 
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	Trustee: [
		{ 'name.first' : 'Paul', 'name.second': 'Ramsey', 'position': 'Chair', 'description': '<p>Hello Im Paul Ramsey,</p>		<p>I was educated at Watford Grammar School for Boys and studied English Literature at the University of Sussex. I took a Post Graduate Diploma in Education at the University of East Anglia before taking a post at Watford Grammar School for Boys as an English Teacher.</p><p>I joined Verulam School in January 2000 as Head of English and subsequently became Deputy Head and then Headteacher in May 2009.</p>		<p>I have always been a voracious reader and currently run the parents\' reading group.</p>' },
		{ 'name.first' : 'William', 'name.second': 'Clare', 'position': 'Treasurer', 'description': '<p>Hi!</p>	<p>My name\'s Will and I\'m a final year undergraduate at the London School of Economics. Along with Alex, I am constantly engaged in furthering the growth of Students4Students, looking to expand to London and Bristol in the coming months. I would love one day for the charity to have an influence in Ghana where I volunteered with Alex this summer. One core focus of my degree is development on an international scale, with Students4Students we have scaled this down to a local level, developing young children\'s potential and achievement. I\'m an avid football player, and cyclist, with a passion for piano who constantly strives to seek out new challenges. An upcoming challenge of mine is a summer triathlon to raise money for Students4Students, which I am currently preparing for.</p>' },
		{ 'name.first' : 'Debi', 'name.second' : 'Robets', 'position': 'Secretary', 'description' : '<p>Hello,</p>		<p>My name is Debi and I have worked in education and training for 30 years. Back in the early \'90\'s I was fortunate enough to work closely with Galina Dolya, one of the world\'s leading authorities on Yygotskan education. With Galina acting as my mentor, I was able to provide a vygotskan approach to the classes I taught in the arts, emotional intelligence, spatial awareness and logic. I taught in her schools in London and Hertfordshire. Working with Dolya provided the theory to my intuitive understanding of an holistic, child centred approach to education. It was here that I was was introduced to The Theory of Constraints (TOC).</p><p>In 2010, I completed a year\'s formal research into my original TOC programme that combined TOC with story to develop student\'s conflict resolution skills and enhance the abilities of students to make good choices. This ensured a distinction for my Masters in Education and formed the basis for the book, Storytelling for Better Behaviour. in 2014 I became an author for the Royal Society for Public Health and have written their Mental Health and Well being course for adults and have been a contributing author for the shorter course aimed at Youth Health Champions.</p>'}
	]
};

/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var admins = [
	{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin(admin, done) {
	
	var newAdmin = new User.model(admin);
	
	newAdmin.isAdmin = true;
	newAdmin.save(function(err) {
		if (err) {
			console.error("Error adding admin " + admin.email + " to the database:");
			console.error(err);
		} else {
			console.log("Added admin " + admin.email + " to the database.");
		}
		done(err);
	});
	
}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};

*/
