import React from 'react'

function About() {
  return (
    <section id='about' className='p-3' style={{background: "white"}}>
      <h1>Project made by</h1>
      <ul>
        <h4><li>Alyaqdhan Zahran Alazri <span><a href="mailto:26s2025@utas.edu.om">(26s2025)</a></span></li></h4>
        <h4><li>Omar Aamir Alsulaimi <span><a href="mailto:26s1930@utas.edu.om">(26s1930)</a></span></li></h4>
        <h4><li>Abdulrahman Salim Alriyami <span><a href="mailto:76s1937@utas.edu.om">(76s1937)</a></span></li></h4>
      </ul>
      <h1>References</h1>
      <ul>
        <h3 className='mt-3 mb-0'>MERN stack</h3>
        <h4><a target='_blank' href="https://www.mongodb.com/"><li>MongoDB</li></a></h4>
        <h4><a target='_blank' href="https://expressjs.com/"><li>Express.js</li></a></h4>
        <h4><a target='_blank' href="https://react.dev/"><li>React.js</li></a></h4>
        <h4><a target='_blank' href="https://nodejs.org/"><li>Node.js</li></a></h4>

        <h3 className='mt-3 mb-0'>Extras</h3>
        <h4><a target='_blank' href="https://socket.io/"><li>Socket.io</li></a> <span>(Realtime changes)</span></h4>
        <h4><a target='_blank' href="https://vitejs.dev/"><li>Vite</li></a> <span>(Smaller app size)</span></h4>
        <h4><a target='_blank' href="https://www.npmjs.com/package/nodemon"><li>Nodemon</li></a> <span>(Auto restart server)</span></h4>
        <h4><a target='_blank' href="https://www.npmjs.com/package/moment-timezone"><li>moment-timezone</li></a> <span>(Correct date)</span></h4>

        <h3 className='mt-3 mb-0'>Styling</h3>
        <h4><a target='_blank' href="https://getbootstrap.com/"><li>Bootstrap</li></a></h4>

        <h3 className='mt-3 mb-0'>Github page</h3>
        <h4><a target='_blank' href="https://github.com/Alyaqdhans/ReactChat"><li>ReactChat</li></a></h4>
      </ul>
      <h6 className='text-center mt-5'>&copy; Copyright reserved to UTAS-Nizwa</h6>
    </section>
  )
}

export default About