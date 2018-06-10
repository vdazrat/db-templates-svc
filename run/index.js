// adds all the data via the model api

async function makeSellers(permission, models) {
	const { User } = models;
	const mollie = await User.forge({ first_name: 'Mollie' }).fetch();
	const gavyn = await User.forge({ first_name: 'Gavyn' }).fetch();
	const johnathan = await User.forge({ first_name: 'Johnathan' }).fetch();
	const amare = await User.forge({ first_name: 'Amare' }).fetch();
	const george = await User.forge({ first_name: 'George' }).fetch();
	const craig = await User.forge({ first_name: 'Craig' }).fetch();
	const christopher = await User.forge({ first_name: 'Christopher' }).fetch();
	const laurel = await User.forge({ first_name: 'Laurel' }).fetch();
	const heather = await User.forge({ first_name: 'Heather' }).fetch();
	const dallas = await User.forge({ first_name: 'Dallas' }).fetch();
	const makhi = await User.forge({ first_name: 'Makhi' }).fetch();
	const pierce = await User.forge({ first_name: 'Pierce' }).fetch();
	const killian = await User.forge({ first_name: 'Killian' }).fetch();

	const venu = await User.forge({ first_name: 'venu' }).fetch();

	try {
		await Promise.all([
			permission.makeSeller(mollie),
			permission.makeSeller(gavyn),
			permission.makeSeller(johnathan),
			permission.makeSeller(amare),
			permission.makeSeller(george),
			permission.makeSeller(craig),
			permission.makeSeller(christopher),
			permission.makeSeller(laurel),
			permission.makeSeller(heather),
			permission.makeSeller(dallas),
			permission.makeSeller(makhi),
			permission.makeSeller(pierce),
			permission.makeSeller(killian),
			permission.makeSeller(venu, 'superAdmin'),
		]);

		console.log('made a bunch of sellers');
		return true;

	} catch (e) {
		console.log('something went wrong.. ', e);
		throw (e);
	}
}

async function sellers (permission, models) {
	// create some productlines
	const { User, Seller } = models;
	const m = await User.forge({ first_name: 'Makhi' }).fetch();
	const l = await User.forge({ first_name: 'Laurel' }).fetch();
	const c = await User.forge({ first_name: 'Craig' }).fetch();

	const makhi = await Seller.forge({ user_id: m.get('id') }).fetch();
	const laurel = await Seller.forge({ user_id: l.get('id') }).fetch();
	const craig = await Seller.forge({ user_id: c.get('id') }).fetch();

	try {
		await makhi.createProductLine({
				name: 'Makhis famous shop',
				description: 'Ethnic wear from inner regions.'
		});

		await laurel.createProductLine({
				name: 'Yannis',
				description: 'name is enough.'
		});

		await craig.createProductLine({
				name: 'Craigs List',
				description: 'the same only different.'
		});

		console.log('successfully craeted product lines');
		return true;
	} catch(e) {
		console.log('could not product line ', e);
		throw (e);
	}


}

async function grants(permission, models) {
	// grant a bunch of privilages
	const { User, Seller } = models;

	const getSellerFromUser = (user) => {
		return Seller.forge({ user_id: user.get('id') }).fetch();
	};

	try{
		const makhi = await User.forge({ first_name: 'Makhi' }).fetch().then(getSellerFromUser);
		const laurel = await User.forge({ first_name: 'Laurel' }).fetch().then(getSellerFromUser);
		const craig = await User.forge({ first_name: 'Craig' }).fetch().then(getSellerFromUser);

		const lm = await permission.getAccessList(makhi, 'product_line');
		const ll = await permission.getAccessList(laurel, 'product_line');
		const lc = await permission.getAccessList(craig, 'product_line');

		mResource = await lm[0].resource.fetch();
		lResource = await ll[0].resource.fetch();
		cResource = await lc[0].resource.fetch();
		// get the users.



		const pierce = await User.forge({ first_name: 'Pierce' }).fetch().then(getSellerFromUser);
		const dallas = await User.forge({ first_name: 'Dallas' }).fetch().then(getSellerFromUser);
		const mollie = await User.forge({ first_name: 'Mollie' }).fetch().then(getSellerFromUser);
		const heather = await User.forge({ first_name: 'Heather' }).fetch().then(getSellerFromUser);
		const amare = await User.forge({ first_name: 'Amare' }).fetch().then(getSellerFromUser);
		const killian = await User.forge({ first_name: 'Killian' }).fetch().then(getSellerFromUser);
		const gavyn = await User.forge({ first_name: 'Gavyn' }).fetch().then(getSellerFromUser);
		const christopher = await User.forge({ first_name: 'Christopher' }).fetch().then(getSellerFromUser);

		await makhi.makeContentReader(pierce, mResource);
		await makhi.makeContentReader(heather, mResource);

		await makhi.makeModerator(dallas, mResource);
		await makhi.makeModerator(mollie, mResource);

		await makhi.makeAdmin(heather, mResource);

		// Laurel

		await laurel.makeContentReader(heather, lResource);

		await laurel.makeModerator(pierce, lResource);
		await laurel.makeModerator(amare, lResource);

		await laurel.makeAdmin(dallas, lResource);
		await laurel.makeAdmin(killian, lResource);

		// craig

		await craig.makeContentReader(makhi, cResource);
		await craig.makeModerator(gavyn, cResource);
		await craig.makeModerator(amare, cResource);
		await craig.makeAdmin(christopher, cResource);

		console.log('successfully ran grants');
	} catch(e) {
		console.log('could not run grants ', e);
	}
	// makhi grants the following to his shop
	/* read only
		Pierce
		heather
		makhi.makeContentReader(pierce, );
		mods
		Dallas
		Mollie

		admins
		Heather

		Laurels store
		read
		Heather

		mods
		Pierce
		amare

		admins
		Dallas
		Killian

		Craigs store

		read
		Makhi

		mods
		Gavyn
		amare

		admins
		christopher
	*/

}

module.exports = [
	makeSellers,
	sellers,
	grants,
];