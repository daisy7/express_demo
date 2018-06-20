var fs = require('fs');

var config = require('./config.js');

var path = require('path');

module.exports.index = function (req, res) {
	fs.readFile(config.dataPath, function (err, data) {
		if (err && err.code !== 'ENOENT') {
			throw err;
		}
		res.render('index.html', { list: JSON.parse(data || '[]') }, function (err, html) {
			if (err) {
				throw err;
			}
			res.send(html);
		});
	});
};

module.exports.submit = function (req, res) {
	res.send('submit.html');
};

module.exports.add = function (req, res) {
	fs.readFile(config.dataPath, function (err, data) {
		if (err && err.code !== 'ENOENT') {
			throw err;
		}
		var list = JSON.parse(data || '[]');
		req.query.id = list.length;
		list.push(req.query);
		fs.writeFile(path.join(__dirname, 'data', 'data.json'), JSON.stringify(list), function (err) {
			if (err) {
				throw err;
			}
			res.redirect('/index');
		});
	});
};

module.exports.details = function (req, res) {
	fs.readFile(config.dataPath, function (err, data) {
		if (err) {
			throw err;
		}
		var list = JSON.parse(data);
		for (var i = 0; i < list.length; i++) {
			if (parseInt(list[i].id) === parseInt(req.query.id)) {
				return res.render('details.html', { item: list[i] }, function (err, html) {
					if (err) {
						throw err;
					}
					res.send(html);
				});
			}
			else if (parseInt(list[i].id) === parseInt(req.params.id)) {
				return res.json(list[i]);
			}
		}
		res.send('no such item');
	});
};
