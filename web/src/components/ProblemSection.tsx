import { BrushHighlight } from "@/components/site/BrushDefs";
import { problemContent } from "@/data/page-content";

export function ProblemSection() {
  return (
    <section className="why-fast ninety-days-problem">
      <div className="container">
        <div className="why-fast-content">
          <div className="why-fast-text">
            <h2>
              {problemContent.headline}
              <BrushHighlight color="brush-lime" />
            </h2>
            <p className="lead">Less random acts of marketing. More connected growth.</p>
            <p>{problemContent.copy}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
