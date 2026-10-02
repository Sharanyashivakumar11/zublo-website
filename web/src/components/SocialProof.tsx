import { BrushUnderline } from "@/components/site/BrushDefs";

const testimonials = [
  {
    quote:
      "They took the time to truly understand our business goals, and the messaging they created for our brand was spot on. They're responsive, open to feedback, and our social media traffic has definitely increased.",
    author: "Sangeetha Ananth, Urban Dhara",
  },
  {
    quote:
      "Their knowledge, execution, and professionalism set an incredibly high standard. From content to platform management across Facebook, Instagram, and Google — their marketing ideas are consistently impressive. A team you can trust and grow with.",
    author: "Team NBC, Nothing But Chicken",
  },
];

export function SocialProof() {
  return (
    <section className="proof ninety-days-proof">
      <div className="container">
        <p className="ninety-days-eyebrow">Real businesses. Real results.</p>
        <h2 className="section-title">
          Owners who needed more than another pretty website
          <BrushUnderline color="brush-pink" />
        </h2>
        <div className="testimonials">
          {testimonials.map((item) => (
            <blockquote key={item.author} className="testimonial-card">
              <p className="testimonial-text">&ldquo;{item.quote}&rdquo;</p>
              <footer className="testimonial-author">— {item.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
