import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { BlogPost } from "../blog";
import { useTranslation } from "react-i18next";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const { t } = useTranslation();

  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'tr' | 'en';
  
  return (
    <Link href={`/blog/${post.category[currentLang]}/${post.slug[currentLang]}`}>
      <Card className="cursor-pointer border-border hover:shadow-xl transition-all duration-300 overflow-hidden h-full hover:border-primary">
        <CardHeader>
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary border-primary/20">
            {t(`blog.filters.${post.category[currentLang]}`)}
          </Badge>
          <CardTitle className="text-xl font-serif text-foreground group-hover:text-primary transition-colors">{t(post.title)}</CardTitle>
          <CardDescription className="text-muted-foreground line-clamp-3">{t(post.excerpt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{post.date.day} {t(post.date.month)} {post.date.year}</span>
            <span>{post.readTime} {t("blog.posts.min")}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
