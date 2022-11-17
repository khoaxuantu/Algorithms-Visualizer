# ALGORITHMS VISUALIZER
### Video Demo:  <URL HERE>
### Description:
- A web application that visualizes algorithms from code (initially provides sorting algorithms demonstration).
- Tools: 
HTML/CSS/JavaScript 
| [Bootstrap](https://getbootstrap.com/)
| [Python/Flask](https://flask.palletsprojects.com/en/2.2.x/)
- (Updated) This project has been hosted in 
[Heroku](https://www.heroku.com), 
detailed deployment configurations are shown in the <code>main</code> branch
- Demo URL: [Algorithms Visualizer app](https://tuss-algorithm-visualizer.herokuapp.com/)
<br><br>

#### Detail
##### File system

<br><code>app.py</code>

The <code>app.py</code> file is where the project starts running.

The app features only focuses on the visualizations, so it does not have much things to do with the backend so far.
Thus, you can see inside the <code>app.py</code> there are only a bunch of routes which redirect to 
<code>html</code> files.

<br><code>requirements.txt</code>

The <code>requirements.txt</code> simply precribes the dependencies of the project.
Inside the file, you can see it includes only a <code>flask</code> keyword, because the app is built on 
[Flask](https://flask.palletsprojects.com/en/2.2.x/) framework.<br>
If we deploy the project, other dependencies (ex. <code>gunicorn</code>, ...) may need to be included as well.

<br><code>static/</code>

Inside the <code>static</code> directory, we can see this app's core structure.
The folder contains two children directories, which are 
<code>css</code> and <code>js</code>.

- <code>css/</code><br>
The folder includes a CSS file, to make some custom decorations other than Bootstrap.
- <code>js/</code><br>
Take a look at <code>js</code> folder, we realize all JavaScript files are stored in there.
It also defines the core mechanics of the visualizations.
    + <code>lib/</code>
    <br>
    The <code>lib</code> folder stores custom shared components that will be used in multiple facets of the app.
    It currently has three modules 
    <code>GraphFactory</code>, <code>nodectrl</code> and <code>VisualizationSupport</code>.<br>
    <code>GraphFactory/</code> is a factory module which is defined by applying factory design pattern, and it is 
    used for producing an initial graph that is waiting for the demonstration. You may want to learn more about this 
    graph factory's structure in ... below.<br>
    <code>nodectrl.js</code> implements all classes that are used to modify components in DOM.<br>
    <code>VisualiztionSupport.js</code> implements all methods that supports the visualization.
    + <code>sort/</code>
    <br>
    The <code>sort</code> folder contains all sorting visualizer modules corresponding to <code>sort</code> html files in 
    <code>templates/</code>.

<code>templates/</code><br>
- <code>core/</code>
<br>
- <code>layouts/</code>

<br><br>

### Running (local machine)
In the root directory of this project, start Flask's built-in server:<br>
<pre> $ flask run </pre>
