import React, {useState, useMemo} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Notes from './components/Notes/Notes';
// import { Editor, Transforms, createEditor, Node } from 'slate';
// import { Editable, withReact, useSlate, Slate } from 'slate-react';

export default function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <li>
              <Link to="/text-editor">Slate</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/notes">
            <Notes />
          </Route>
          <Route path="/text-editor">
            <Slate />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Notes-app</h2>;
}

function Slate() {
  return <h2>Slate</h2>
}
// function Slate() { 
//     const editor = useMemo(() => withReact(createEditor()), [])
//     // Add the initial value when setting up our state.
//     const [value, setValue] = useState([
//       {
//         type: 'paragraph',
//         children: [{ text: 'A line of text in a paragraph.' }],
//       },
//     ])
  
//     return (
//       <Slate editor={editor} value={value} onChange={newValue => setValue(newValue)}>
//         <Editable />
//       </Slate>
//     )
// }