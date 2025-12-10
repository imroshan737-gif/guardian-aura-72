import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import NeonButton from "./NeonButton";
import { Textarea } from "@/components/ui/textarea";

interface SessionFeedbackProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionTitle: string;
  onSubmit: (rating: number, feedback: string) => void;
}

export default function SessionFeedback({ open, onOpenChange, sessionTitle, onSubmit }: SessionFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit(rating, feedback);
    setRating(0);
    setFeedback("");
  };

  const moodLabels = ["", "😔 Not great", "😐 Okay", "🙂 Good", "😊 Great", "🤩 Amazing"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/95 backdrop-blur-xl border border-primary/20 max-w-md">
        <div className="text-center space-y-6">
          {/* Celebration */}
          <div className="space-y-2">
            <div className="text-5xl">🎉</div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">Session Complete!</h2>
            <p className="text-muted-foreground">{sessionTitle}</p>
          </div>

          {/* Rating */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">How are you feeling now?</p>
            
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-2 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-colors",
                      (hoveredRating || rating) >= star
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>

            {(rating > 0 || hoveredRating > 0) && (
              <p className="text-sm font-medium text-primary">
                {moodLabels[hoveredRating || rating]}
              </p>
            )}
          </div>

          {/* Feedback text */}
          <div className="space-y-2 text-left">
            <label className="text-xs font-orbitron uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MessageSquare className="w-3 h-3" />
              Any thoughts? (optional)
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share how this session made you feel..."
              className="bg-muted/30 border-border/30 focus:border-primary/50 min-h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <NeonButton
              variant="ghost"
              onClick={() => {
                onSubmit(rating || 3, "");
                setRating(0);
                setFeedback("");
              }}
              className="flex-1"
            >
              Skip
            </NeonButton>
            <NeonButton
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1"
            >
              Submit
            </NeonButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
