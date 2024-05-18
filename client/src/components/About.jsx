import React from 'react'

function About() {
  return (
    <section className='p-3 rounded' style={{background: "white"}}>
      <h1>Project made by</h1>
      <ul>
        <h4><li>Alyaqdhan Zahran Alazri <span>(26s2025)</span></li></h4>
        <h4><li>Omar Aamir Alsulaimi <span>(26s1930)</span></li></h4>
      </ul>
      <h1>References</h1>
      <ul>
        <h3 className='mt-3 mb-0'>MERN stack</h3>
        <h4><a target='_blank' href="https://www.mongodb.com/"><li>MongoDB</li></a></h4>
        <h4><a target='_blank' href="https://expressjs.com/"><li>Express.js</li></a></h4>
        <h4><a target='_blank' href="https://react.dev/"><li>React.js</li></a></h4>
        <h4><a target='_blank' href="https://nodejs.org/"><li>Node.js</li></a></h4>

        <h3 className='mt-3 mb-0'>Socket.io (realtime changes)</h3>
        <h4><a target='_blank' href="https://socket.io/"><li>Socket.io</li></a></h4>

        <h3 className='mt-3 mb-0'>Github</h3>
        <h4><a target='_blank' href="https://github.com/Alyaqdhans/ReactChat"><li>ReactChat</li></a></h4>
      </ul>
    </section>
  )
}

export default About