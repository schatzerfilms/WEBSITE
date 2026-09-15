import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import projectsData from '../projects.json';

const projects = projectsData;

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <Link to={`/project/${project.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.8,
          delay: (index % 2) * 0.1 + 0.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group relative overflow-hidden aspect-video bg-black cursor-pointer block"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
        <div className="absolute inset-0 flex items-end justify-between p-5 md:p-7">
          <h3 className="project-title text-xl md:text-2xl lg:text-3xl text-white">
            {project.title}
          </h3>
          <span className="text-xs md:text-sm font-sans tracking-widest text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {project.year}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export function Projects() {
  return (
    <section id="work" className="py-24 px-0 bg-black">
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight">
            PROJECTS
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}