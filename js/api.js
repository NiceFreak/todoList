var colors = [
	{
		"name": "浅紫",
		"jpcolor": "#c4a3bf"
	}, {
		"name": "霞色",
		"jpcolor": "#c8c2c6"
	}, {
		"name": "藤鼠",
		"jpcolor": "#a6a5c4"
	}, {
		"name": "半色",
		"jpcolor": "#a69abd"
	}, {
		"name": "薄色",
		"jpcolor": "#a89dac"
	}, {
		"name": "薄鼠",
		"jpcolor": "#9790a4"
	}, {
		"name": "鳩羽鼠",
		"jpcolor": "#9e8b8e"
	}, {
		"name": "鳩羽色",
		"jpcolor": "#95859c"
	}, {
		"name": "利休白茶",
		"jpcolor": "#b3ada0"
	}, {
		"name": "茶鼠",
		"jpcolor": "#a99e93"
	}, {
		"name": "胡桃染",
		"jpcolor": "#a58f86"
	}, {
		"name": "青緑",
		"jpcolor": "#00a497"
	}, {
		"name": "水浅葱",
		"jpcolor": "#80aba9"
	}, {
		"name": "湊鼠",
		"jpcolor": "#80989b"
	}, {
		"name": "紅掛空色",
		"jpcolor": "#8491c3"
	}, {
		"name": "紅碧",
		"jpcolor": "#8491c3"
	}, {
		"name": "紫苑色",
		"jpcolor": "#867ba9"
	}, {
		"name": "藤紫",
		"jpcolor": "#a59aca"
	}, {
		"name": "薄葡萄",
		"jpcolor": "#c0a2c7"
	}, {
		"name": "利休鼠",
		"jpcolor": "#888e7e"
	}, {
		"name": "青白橡",
		"jpcolor": "#9ba88d"
	}, {
		"name": "柳染",
		"jpcolor": "#93b881"
	}, {
		"name": "深川鼠",
		"jpcolor": "#97a791"
	}, {
		"name": "千草色",
		"jpcolor": "#92b5a9"
	}, {
		"name": "长春色",
		"jpcolor": "#c97586"
	}, {
		"name": "梅鼠",
		"jpcolor": "#c099a0"
	}, {
		"name": "鸨浅葱",
		"jpcolor": "#b88884"
	}, {
		"name": "梅染",
		"jpcolor": "#b48a76"
	}, {
		"name": "苏芳香",
		"jpcolor": "#a86965"
	}, {
		"name": "浅苏芳",
		"jpcolor": "#a25768"
	}
]

var formatTime = function(num) {
	var str = String(num)
	while (str.length < 2) {
		str = '0' + str
	}
	return str
}

var time = function() {
	var d = new Date()
	year = d.getFullYear()
	month = formatTime(d.getMonth() + 1)
	day = formatTime(d.getDate())
	hour = formatTime(d.getHours())
	min = formatTime(d.getMinutes())
	return `${year}/${month}/${day}  ${hour}:${min}`
}

var getID = function() {
	var idStr = localStorage.stickersID
	if (idStr == undefined) {
		idStr = '0'
	}
	var id = parseInt(idStr)
	localStorage.stickersID = String(id + 1)
	return idStr
}

var getZIndex = function() {
	var c = e('#id-sticker-container')
	var z = parseInt(c.dataset.num) + 1
	c.dataset.num = z
	return c.dataset.num
}

var coloredTodo = function() {
	var length = colors.length
	var color = colors[Math.floor(Math.random() * length)].jpcolor
	return color
}

const Todo = function(ID = '', date = '', zIndex = '', color = '') {
	this.id = ID,
	this.title = "标题",
	this.done = false,
	this.message = "<div>请输入待办事项</div>",
	this.date = date,
	this.deadline = " ",
	this.x = "200px",
	this.y = "100px",
	this.z = zIndex,
	this.color = color
}

var todoNew = function() {
	var d = time()
	var ID = getID()
	var zIndex = getZIndex()
	var color = coloredTodo()
	var t = new Todo(ID, d, zIndex, color)
	return t
}

// 保存一个 todoList
var saveTodos = function(todoList) {
	localStorage.stickers = JSON.stringify(todoList)
}
// 保存 todo
var saveTodo = function(todo) {
	var todoList = loadTodos()
	todoList.push(todo)
	saveTodos(todoList)
}
// 返回存储的所有 todo
var loadTodos = function() {
	var todoStr = localStorage.stickers
	// 第一次读取的时候，结果是 undefined
	// 所以需要设置为空数组 '[]'
	// 否则 JSON.parse 就报错了
	if (todoStr == undefined) {
		todoStr = '[]'
	}
	var todoList = JSON.parse(todoStr)
	return todoList
}

var changeTodo = function(newTodo) {
	var id = newTodo.id
	var list = loadTodos()
	var newList = []
	for (var i = 0; i < list.length; i++) {
		var todo = list[i]
		if (todo.id != id) {
			newList.push(todo)
		} else {
			newList.push(newTodo)
		}
	}
	saveTodos(newList)
}

var deleteTodo = function(id) {
	var list = loadTodos()
	var newList = []
	for (var i = 0; i < list.length; i++) {
		var todo = list[i]
		if (todo.id != id) {
			newList.push(todo)
		}
	}
	saveTodos(newList)
}

var getTodo = function(id) {
	var list = loadTodos()
	for (var i = 0; i < list.length; i++) {
		var todo = list[i]
		if (todo.id == id) {
			return todo
		}
	}
	return false
}
