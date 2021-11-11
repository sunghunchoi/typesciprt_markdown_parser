enum TagType {
    Paragraph,
    Header1,
    Header2,
    Header3,
    HorizontalRule
}

class HtmlHandler {
    public TextChangeHandler(id : string, output : string) :void {
        let markdown = <HTMLTextAreaElement>document.getElementById(id);
        let markdownOutput = <HTMLLabelElement>document.getElementById(output);
        if (markdown !== null) {
            markdown.onkeyup = (e) => {
                if(markdown.value) {
                    markdownOutput.innerHTML = markdown.value;
                }
                else
                    markdownOutput.innerHTML = "<p></p>";
            }
        }
    }
}

class TagTypeToHtml {
    // readonly -> 인스턴스가 만들어지고(생성자) 난 뒤 클래스 어디에서도 해당 필드를 재선언 할 수 없음.
    private readonly tagType : Map<TagType, string> = new Map<TagType, string>();
    constructor() {
        this.tagType.set(TagType.Header1, "h1");
        this.tagType.set(TagType.Header2, "h2");
        this.tagType.set(TagType.Header3, "h3");
        this.tagType.set(TagType.Paragraph, "p");
        this.tagType.set(TagType.HorizontalRule, "hr");
    }

    public GetOpeningTag(tagType: TagType) : string {
        return this.GetTag(tagType, `<`)
    }

    public GetClosingTag(tagType: TagType) : string {
        return this.GetTag(tagType, `</`)
    }

    private GetTag(tagType:TagType, openingTagPattern: string) : string {
        let tag = this.tagType.get(tagType);
        if (tag !== null) {
            return `${openingTagPattern}${tag}>`
        }
        return `${openingTagPattern}p>`
    }
}

interface IMarkdownDocument {
    // REST 파라미터를 통해 여러개의 항목을 받을수 있게
    Add(...content: string[]) : void;
    Get() : string;
}

class MarkdownDocument implements IMarkdownDocument {
    private content : string = "";
    Add(...content: string[]) : void {
        content.forEach(element => {
            this.content += element;
        })
    }
    Get():string {
        return this.content
    }
}

