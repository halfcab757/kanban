import classes from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={classes.about}>
      <h2>Why did I build this web app?</h2>
      <p>
        <span className={classes.firstletter}>I</span>built this lean project to
        practice React in combination with TypeScript. I set my focus completely
        on the frontend logic and so I did not setup a REST API to manage
        log-ins or to store user data.
      </p>
      <h2>What did I learn during this project?</h2>
      <p>
        <span className={classes.firstletter}>R</span>egarding using React
        combined with TypeScript I enjoyed some improvements like the good
        auto-completion and the helpful error messages during development.
        <br />
        <br />
        <span className={classes.firstletter}>O</span>n the other hand, it took
        me more time to create components or to setup context because I had to
        define the expected props that precisely. Working on my own, I will
        stick to using React only. Working in a team, I will be having to have
        my TypeScript knowledge because when it comes to team-work TypeScript
        shines as it reduces misunderstandings quite effectively.
      </p>

      <p>
        <span className={classes.firstletter}>I</span>n general I enjoyed
        building ann app from skretch and reasoning about the UX, the design,
        the component tree and the state management. I liked having that many
        options regarding what to do - Which functions should this app offer? -
        and how to setup the according logic.
        <br />
        <br />
        <span className={classes.firstletter}>K</span>eeping that many details
        in mind was a nice challenge - e.g. making sure that the app looks good
        and works fine on mobile and desktop devices. Doing some optimization by re-factoring code and adding lazy loading was a helpful
        practice for me, too.
      </p>
      <p>
        <span className={classes.firstletter}>I</span> am happy with this
        project, though I know it is not perfect, e.g. some components got a bit too big. To improve that in the future I will split responsibilites even more by creating more specified components. The lessons I learned by
        building it will help during my next projects.
      </p>
      <p>
        <span className={classes.firstletter}>F</span> eel free to take a closer look at this app by 
        checking out it's corresponding code on my github-profile: LINK.
      </p>
      <h2>Let's get in contact</h2>
      <p>
        <span className={classes.firstletter}>T</span>hank you once more for
        your interest in my web app. Feel free to contact me on{' '}
        <span>
          <a
            href="https://www.linkedin.com/in/martin-hodsman/"
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN
          </a>
        </span>
        . I am excited to hear your feedback.
      </p>
      <p>
        Kind regards
        <br />
        Martin
      </p>
    </div>
  );
};

export default About;
