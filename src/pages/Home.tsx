import Articles from "../components/Articles.tsx"
import { BarChart, Blocks, Brain, Gauge, Layers, Person } from "../components/Icons.tsx"
import { InterestsCards } from "../components/Interests.tsx"
import SocialLinks from "../components/SocialLinks.tsx"
import UndrawProgramming from "../components/UndrawProgramming.tsx"
import { articles } from "../lib/content"

const interests = [
  { icon: <Gauge />, label: "Web Performance" },
  { icon: <Layers />, label: "Frontend Architecture" },
  { icon: <Person />, label: "Accessible Interfaces" },
  { icon: <BarChart />, label: "Data visualizations" },
  { icon: <Brain />, label: "AI-assisted Engineering" },
  { icon: <Blocks />, label: "Design Systems" },
]

export default function Home() {
  return (
    <div className="pb-12 pt-8">
      <section class="flex flex-col items-center gap-8 rounded pb-20 md:flex-row md:pt-10">
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="text-4xl leading-[1.15]! md:text-5xl">
            Web engineering <i className="text-ctp-blue">experimentation</i>,{" "}
            <i className="text-ctp-mauve">learning</i>, and{" "}
            <i className="text-ctp-flamingo">ideas</i> worth sharing in the world wide web.
          </h2>
          <SocialLinks size="lg" />
        </div>
        <div className="w-full flex-2 rounded-full">
          <UndrawProgramming />
        </div>
      </section>

      <section className="flex flex-col gap-4 pb-20">
        <p className="text-lg font-semibold">Hello there</p>
        <p className="text-lg">
          I'm Francisco, a software engineer specialized in web technologies, who really enjoys
          figuring out technical challenges, learning, research, and loves building{" "}
          <b>performant</b> and <b>polished</b> user interfaces.
        </p>
        <InterestsCards interests={interests} />
      </section>

      <Articles posts={articles} />
    </div>
  )
}
