const users =
[
	'Mollie Weaver',
	'Gavyn Melton',
	'Johnathan Cordova',
	'Amare Long',
	'George Morris',
	'Dakota Nicholson',
	'Arielle Huerta',
	'Melanie Mccarthy',
	'Craig Shah',
	'Laurel Mendoza',
	'Pierce Levine',
	'Yair Sims',
	'Christopher Riley',
	'Killian Humphrey',
	'Myah Hogan',
	'Heather Wells',
	'Yaritza Briggs',
	'Dallas Cherry',
	'Irene Rice',
	'Makhi Garcia',
	'venu dasarathy'
];

const makeUser = (user) => {
	const [first, last] = user.split(' ');
	const email =  `${first.toLowerCase()}.${last.toLowerCase()}@test.com`;
	const phone = Math.ceil(Math.random()*10000000000);
	return {
		first_name: first,
		last_name: last,
		email,
		phone,
	};
};

const userMap = users.map(getUser);

exports.seed = function(knex, promise) {
	return knex('users').del()
		.then(function() {
			return knex('users').insert(userMap);
		});
};
