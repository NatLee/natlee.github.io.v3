import { notFound } from 'next/navigation';
import { getProjectById, allProjectsData } from '@/data/projects';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateStaticParams() {
    return allProjectsData.map((project) => ({
        id: project.id,
    }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const project = getProjectById(id);

    if (!project) {
        notFound();
    }

    return (
        <ProjectDetailClient project={project} />
    );
}
