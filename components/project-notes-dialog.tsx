"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import { useState } from "react";

import type { ProjectId } from "@/content/site";

const MarkdownRenderer = dynamic(() => import("./markdown-renderer"), {
  loading: () => (
    <div className="notes-skeleton" aria-label="Loading concept notes">
      <span />
      <span />
      <span />
      <span />
    </div>
  ),
});

export function ProjectNotesDialog({ projectId, title }: { projectId: ProjectId; title: string }) {
  const [open, setOpen] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState("");

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen || markdown) return;

    setError("");
    void import("@/content/project-notes")
      .then((notesModule) => setMarkdown(notesModule.getProjectNotes(projectId)))
      .catch(() => setError("The local concept notes could not be opened. Please try again."));
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button className="project-notes-trigger" type="button">
          Read concept notes
          <ArrowUpRight aria-hidden="true" size={18} weight="regular" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="notes-overlay" />
        <Dialog.Content className="notes-dialog glass-surface" aria-describedby={`${projectId}-notes-caption`}>
          <div className="notes-dialog-header">
            <div>
              <Dialog.Title>{title} concept notes</Dialog.Title>
              <Dialog.Description id={`${projectId}-notes-caption`}>
                Local concept fixture. No public repository is attached.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="icon-button" type="button" aria-label="Close concept notes">
                <X aria-hidden="true" size={22} weight="regular" />
              </button>
            </Dialog.Close>
          </div>
          <div className="notes-dialog-body">
            {error ? (
              <div className="notes-error" role="alert">
                <p>{error}</p>
                <button type="button" onClick={() => handleOpenChange(true)}>
                  Try again
                </button>
              </div>
            ) : markdown ? (
              <MarkdownRenderer markdown={markdown} />
            ) : (
              <div className="notes-skeleton" aria-label="Loading concept notes">
                <span />
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
