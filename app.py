from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("core/index.html")

@app.route("/bubble_sort")
def bubble_render():
    return render_template("core/sort/bubble_sort.html")

@app.route("/selection_sort")
def selection_render():
    return render_template("core/sort/selection_sort.html.j2")
