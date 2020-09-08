const { urlencoded } = require('body-parser');

const bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	express = require('express'),
	app = express();

// APP CONFIG

mongoose.connect('mongodb://localhost/bday_v3', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// MONGOOSE/MODEL CONFIG

const messageSchema = new mongoose.Schema({
	name: String,
	body: String,
	created: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// RESTFUL ROUTES

// index

app.get('/', function(req, res) {
	res.redirect('/home');
});

// Comments Routes

app.get('/home', function(req, res) {
	Message.find({}, function(err, messages) {
		if (err) {
			console.log('Error');
		} else {
			res.render('index', { messages: messages });
		}
	});
});

// new comments route
app.get('/home/new', function(req, res) {
	res.render('new');
});

// create a new comment
app.post('/home', function(req, res) {
	Message.create(req.body.message, function(err, newMessage) {
		if (err) {
			res.render('new');
		} else {
			res.redirect('/home#messages');
		}
	});
});

// SERVER LISTEN
// app.listen(3000, function() {
// 	console.log('Server Has Started!');
// });

app.listen(process.env.PORT, process.env.IP, function() {
	console.log('Kamil Birthday Server Has Started!');
});
