/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	OxfordCommitteeMember: [

		{ 'name.first': 'Alex', 'name.last': 'Astley', 'position': 'Co-Founder and Director', 'description': '<p>Hi!</p>	<p>My name is Alex, I co-founded the charity with Will in early 2015 and I am in my 2nd year at Oxford studying PPE. I met Will whilst volunteering on an education project in Ghana. Although I have always been interested in education and volunteering it was in Ghana that I truly understood the power of education and the impact it can have upon both individuals and society. Aside from Students4Students I have volunteered as a swim teacher for a number of years and have also been active in championing issues effecting young people. I hope to use all of these experiences I have had to ensure Students4Students makes the most impact it can.</p>' },

		{ 'name.first': 'Katie', 'name.last': 'Piner', 'position': 'Fundraising Officer', 'description': "<p>Hello,</p>	<p>I'm Katie, and I am a third-year visiting student at Oxford University. When I'm not on my year abroad, I regularly study English and Economics at Wellesley College. I've tutored in both group and one-on-one settings with students at the African Hope School in Cairo, Egypt. Having experienced these two different styles of tutoring I can really see just how helpful it is when students are given the opportunity to have personalized help through a one-on-one tutoring system. Students4Student's determination to offer such tailored academic assistance is the feature of the organization that I believe will make it impact student's lives for the better.</p>" },


		{ 'name.first': 'Jan', 'name.last': 'Dudek', 'description': "<p>My name is Jan and I am a visiting student at Oxford University majoring in economics. Throughout my studies, I have tutored athletes ranging from football players to gymnasts, which has been one of the most fulfilling experiences of my academic career. Tutoring has allowed me not only to help achieve students' potential, but it introduced me to amazing people along the way and helped me communicate my thoughts more effectively. Through Students4Students, I hope to channel my passion for education and allow more students to be empowered through achieving their academic potential.</p>" },

		{ 'name.first': 'Eleanor', 'name.last': 'Smyth', 'position': 'Child Welfare Officer', 'description': "<p>Hello!</p>	<p>My name is Eleanor Smyth, I am 19 years old and currently in my first year at Oxford University, studying Philosophy and Theology. Being a first year means that I have not had the same opportunity to gain the experiences others have; however I don't believe this will be a barrier to success. Instead I will rely upon my passion for education and working with children. Moreover as in wider life I shall take every opportunity to learn. This attitude of looking at where people end up not where they start from is the key reason in my desire to work with Students4Students.</p>" },

		{ 'name.first': 'James', 'name.last': 'Powell', 'position': 'Tutor Liason Officer', 'description': "<p>Hi, I'm James and I'm currently at Oxford University studying Law. I've worked with children of 7-13 during my time with the Stonyhurst Children's Holiday Trust, and Students 4 Students gives me the opportunity to give targeted help to those most in need of it. In addition to my university work, I'm part of the Oxford University Jitsu Team, and through that I get to the opportunity to learn new skills in a different environment. That's what I think education should be about - learning to love learning different things in different ways.</p>" },

		{ 'name.first': 'Lauren', 'name.last': 'Moult', 'position': 'School Liason Officer', 'description': "<p>Hi, I'm Lauren and I'm an undergraduate student at the University of Oxford studying Human Sciences. Helping others to learn is a really important part of my life. I have worked to develop online learning resources for primary and secondary school aged children, and spent time volunteering as an English teacher in Sangkhlaburi, Thailand. I believe that education is about realising your potential. By helping children to navigate barriers to achievement, Students4Students provides an opportunity to build the skills and confidence of those most at risk of not fulfilling their potential. Most importantly it will make a lasting difference in their lives.</p>" },

		{ 'name.first': 'Jake', 'name.last': 'Stockwin', 'position': 'IT Officer', 'description': "<p>Hi, <br> I'm Jake and I am a 2nd year undergraduate Mathematician of the University of Oxford. I have been tutoring GCSE and A-Level students for over a year now, so have some experience in that field. I also have lots of computing experience and am currently in charge of maintaining a couple of other websites.<br>If you have any suggestions/improvements for the website, the please get in touch!</p>" },
	],
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
