import classes from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={classes.about}>
      <h2>Thank you very much</h2>
      <p>... for taking a look at my kanban app. I appreciate it!</p>
      <p>
        I would like to introduce myself and give you an insight on why and how
        I build this app.
      </p>
      <h3>About me</h3>
      <p>Take parts from memory app</p>
      <h3>Why I built this web app</h3>
      <p>
        <span className={classes.firstletter}>A</span>fter getter familiar with TypeScript and the combination of TypeScript
        and React, I wanted to put my new knowledge to practice. I chose the
        idea of a Kanban app, as this project should stay lean. Including the
        long time of testing different designs, it took me a week to build this
        app. My focus was the frontend logic, so I did not set up login
        functionality and a backend. If I would have done it, I would have used
        either firebase to make it quick and easy or build a REST API with
        node.js and mongo.db. It would not have been my first rest API.
      </p>
      <h3>What I learnd during this project</h3>
      <p>
      <span className={classes.firstletter}>I</span>t was a good css repetition, because i did not work with box-shadow and
        flex for a while I have seen some advantages of combining React and
        TypeScript - better autocompletion (for props, or using union-type in
        Props or enums) I have seen that the combination with TS also makes some
        steps more complicated (e.g. take a look at my TodosContext - setting
        the generic type or when setting the generic type for Components which
        use many props) It would definitely have been easier and faster using
        just React It was interesting to reason about which states I need and in
        whcih components to manage it Or to reason about if useReducer would be
        overkill or not - in this case I am happy with using state only Mind all
        the details - e.g. that the tipbox is centered also when button width
        changes Using css and sometimes surprised by browser behaviour/defaults
        - e.g. margin and the scrollbar of the browser, hard to postion elements
        sometimes In an own project, the possibilities for the design and the
        functionality are endless Learning to first think of good options and
        then coding the best option - and maybe try again another option too
        Endless options to implement one idea/functionality - how to split code,
        how granular should compoments be, which state to use and to manage
        where, which code is needed in many places and hence belongs better to a
        Context to avoid passing props through components that do not need these
        props
      </p>
      <h3>Resumee</h3>
      <p>
      <span className={classes.firstletter}>I</span> am happy with this result for just a week and around 15 hours of
        coding - including testing one color, shape and size after another. The
        logic part was maybe 10 hours.
      </p>
      <h3>Contact me</h3>
      <p>
      <span className={classes.firstletter}>T</span>hank you once more for checking my app and for reading this part about
        my creation process. If you liked it and if you want to give me
        feedback, feel free to add me on <span><a href='https://www.linkedin.com/in/martin-hodsman/' target='_blank' rel='noreferrer'>LINKEDIN</a></span>. I am excited to hear from
        you! I wish you a nice day! Kind regards Martin
      </p>

    </div>
  );
};

export default About;
